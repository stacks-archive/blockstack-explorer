const express = require('express');
const next = require('next');
const LRUCache = require('lru-cache');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const { getAccounts } = require('./lib/addresses');
const makeAPIController = require('./controllers/api-controller');
const makeAppController = require('./controllers/app-controller');
const Auth = require('./lib/authentication');

passport.use(Auth);

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

    const server = express();

    server.use(
      session({
        secret: 'SECRET',
        resave: false,
        saveUninitialized: true,
        proxy: true,
        cookie: {
          httpOnly: false,
          maxAge: 1000 * 60 * 60 * 24 * 365,
          secure: !dev,
        },
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
