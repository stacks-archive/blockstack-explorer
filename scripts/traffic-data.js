const mongoose = require('mongoose');
require('dotenv').config();
const Event = require('../models/event');
const { getAccounts } = require('../lib/addresses');

// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(process.env.PROD_MONGODB_URI);

const fetch = async () => {
  const addressVisits = await Event.find({ name: 'view_address' }).exec();
  const { accountsByAddress } = await getAccounts();
  console.log(`${addressVisits.length} total address page views`);
  const ips = {};
  const addresses = {};
  // console.log(addressVisits.length)
  addressVisits.forEach((event) => {
    const { ip } = event;
    ips[ip] = ips[ip] || 0;
    ips[ip] += 1;
    if (accountsByAddress[event.metadata.address]) {
      addresses[event.metadata.address] = true;
    }
  });

  let visits = 0;
  addressVisits.forEach((event) => {
    if (ips[event.ip] === 1) {
      console.log('visited', event.metadata.address);
      visits += 1;
    }
  });

  console.log(`${visits} unique IP address page visits`);
  console.log(`${Object.keys(addresses).length} valid address page visits`);
  // console.log(ips);
};

fetch()
  .catch((e) => {
    console.log(e);
  })
  .finally(() => {
    process.exit();
  });
