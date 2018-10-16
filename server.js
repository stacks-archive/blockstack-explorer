const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const passport = require('passport');
const session = require('cookie-session');
const secure = require('express-force-https');
const mongoose = require('mongoose');
const { decorateApp } = require('@awaitjs/express');
require('dotenv').config();

const { getAccounts } = require('./lib/addresses');
const makeAPIController = require('./controllers/api-controller');
const makeAppController = require('./controllers/app-controller');
const makeAdminController = require('./controllers/admin-controller');
const Auth = require('./lib/authentication');

passport.use(Auth);
mongoose.connect(process.env.MONGODB_URI);

const dev = process.env.NODE_ENV !== 'production';

const port = parseInt(process.env.PORT, 10) || 3000;
const app = next({ dev });
const handle = app.getRequestHandler();

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 10,
  maxAge: dev ? 1000 * 30 : 1000 * 60 * 60, // 1hour
});

const setup = async () => {
  try {
    await app.prepare();
    const Genesis = await getAccounts();
    console.log(`${Genesis.accounts.length} accounts`);
    console.log(
      `${Genesis.accounts.length - Object.keys(Genesis.accountsByAddress).length} accounts without an address`,
    );

    const server = decorateApp(express());

    if (!dev) {
      server.use(secure);
    }

    server.use(
      session({
        name: 'session',
        keys: ['SECRET'],
        maxAge: 24 * 60 * 60 * 1000 * 365 // 1 year
      }),
    );

    passport.serializeUser((user, done) => {
      done(null, user);
    });

    passport.deserializeUser((user, done) => {
      done(null, user);
    });

    server.use(passport.initialize());
    server.use(passport.session());

    server.set('views', './common/server-views');
    server.set('view engine', 'pug');

    server.use((req, res, _next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', '*');
      _next();
    });

    server.get('/login', (req, res) => {
      console.log(req.user);
      handle(req, res);
    });

    server.get('/logout', (req, res) => {
      req.logout();
      res.redirect('/login');
    });

    server.post('/auth', (req, res, _next) => {
      if (req.query.password === process.env.ADMIN_PASSWORD) {
        req.login({ admin: true }, (error) => {
          if (error) {
            console.log(error);
            return _next(error);
          }
          console.log('login success');
          res.json({ success: true });
          return _next();
        });
      } else {
        res.status(400);
        res.json({ success: false });
        return _next();
      }
    });

    server.get('/clear-cache', (req, res) => {
      if (req.query.key === process.env.API_KEY) {
        console.log('Clearing cache from API');
        ssrCache.reset();
        res.json({ success: true });
      } else {
        res.status(400).json({ success: false });
      }
    });

    server.use('/api', makeAPIController(Genesis));

    server.use('/app', makeAppController(app, ssrCache));
    server.use('/admin', makeAdminController(app));

    server.get('/', (req, res) => res.redirect('/app'));

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

setup();
