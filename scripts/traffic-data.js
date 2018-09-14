const mongoose = require('mongoose');
require('dotenv').config()
const Event = require('../models/event');

mongoose.connect(process.env.MONGODB_URI);

const fetch = async () => {
  const addressVisits = await Event.find({ name: 'view_address' }).exec();
  console.log(`${addressVisits.length} total address page views`)
  const ips = {};
  // console.log(addressVisits.length)
  addressVisits.forEach((event) => {
    const { ip } = event;
    ips[ip] = ips[ip] || 0;
    ips[ip] += 1;
  })

  const visits = 0
  addressVisits.forEach((event) => {
    if (ips[event.ip] === 1) {
      console.log('visited', event.metadata.address)
      visits += 1
    }
  })

  console.log(`${visits} unique address page visits`)
}

fetch().finally(() => {
  process.exit()
})