const LocalStrategy = require('passport-local');

const authHandler = (username, password, done) => {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminPassword) {
    if (adminPassword === password) {
      done(null, { admin: true });
    } else {
      done(null, false);
    }
  } else {
    done(null, { admin: true });
  }
};

module.exports = new LocalStrategy(authHandler);
