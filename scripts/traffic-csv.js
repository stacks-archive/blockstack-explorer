const mongoose = require('mongoose');
require('dotenv').config();
const Event = require('../models/event');
const { getAccounts } = require('../lib/addresses');
const clone = require('lodash/clone')
const papa = require('papaparse');
const fs = require('fs-extra');
const geoip = require('geoip-lite');
const moment = require('moment');

// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect(process.env.PROD_MONGODB_URI);

const run = async () => {
  const { accountsByAddress } = await getAccounts();
  const addressVisits = await Event.find({ name: 'view_address' }).exec();
  const unvisited = clone(accountsByAddress);
  addressVisits.forEach((event) => {
    const { address } = event.metadata;
    delete unvisited[address];
  })
  
  const unvisitedCSV = papa.unparse(Object.values(unvisited));

  await fs.writeFile('./data/unvisited.csv', unvisitedCSV);

  const addressVisitsWithIP = addressVisits.map((event) => {
    const { address } = event.metadata;
    const createdAt = moment(event.createdAt).format('YYYY/MM/DD HH:mm a Z')
    const ip = event.ip.slice(7);
    // const geo = geoip.lookup(ip);
    // let city, region, country = null;
    // const { city, region, country } = geo || {};
    // if (geo) {
    //   console.log('works', ip)
    // } else {
    //   console.log(ip)
    // }
    return {
      ip,
      createdAt,
      address
    }
  })

  const visitsCSV = papa.unparse(addressVisitsWithIP);

  await fs.writeFile('./data/visits.csv', visitsCSV);

  // console.log(addressVisitsWithIP[0])
}

run().catch((e) => {
  console.log(e)
}).finally(() => {
  process.exit(0)
})