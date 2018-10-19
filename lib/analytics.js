const Event = require('../models/event');

const getIP = (req) => {
  let ipAddr = req.headers['x-forwarded-for'];
  if (ipAddr) {
    const list = ipAddr.split(',');
    ipAddr = list[list.length - 1];
  } else {
    ipAddr = req.connection.remoteAddress;
  }
  return ipAddr;
};

const track = async (name, req, metadata = {}) => {
  if (req.user) {
    console.log('Admin logged in. Not tracking.');
    return false;
  }
  if (!process.env.MONGODB_URI) {
    console.log('No mongoDB connection. Not tracking events.');
    return false;
  }
  const event = await Event.create({
    name,
    ip: getIP(req),
    userAgent: req.get('User-Agent'),
    metadata,
  });
  return event;
};

module.exports = {
  track,
};
