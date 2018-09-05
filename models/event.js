const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    name: String,
    ip: String,
    userAgent: String,
    metadata: Object,
  },
  {
    timestamps: true,
  },
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
