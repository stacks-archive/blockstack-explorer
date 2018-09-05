const Event = require('../models/event');

const track = async (name, req, metadata = {}) => {
  const event = await Event.create({
    name,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    metadata,
  });
  return event;
};

module.exports = {
  track,
};
