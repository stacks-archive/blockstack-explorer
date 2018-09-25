const mongoose = require('mongoose');
require('dotenv').config();
const Event = require('../models/event');
const { getAccounts } = require('../lib/addresses');
const clone = require('lodash/clone')
const papa = require('papaparse');
const fs = require('fs-extra');
const geoip = require('geoip-lite');
const moment = require('moment');

const makeVisitsCSV = async () => {
  const { accountsByAddress } = await getAccounts();
  const addressVisits = await Event.find({ name: 'view_address' }).exec();
  const addressVisitsWithIP = addressVisits.map((event) => {
    const { address } = event.metadata;
    const createdAt = moment(event.createdAt).format('YYYY/MM/DD HH:mm a Z')
    const ip = event.ip;
    const geo = geoip.lookup(ip);
    const { city, country } = geo || {};
    return {
      ip,
      createdAt,
      address,
      city,
      country
    }
  })

  const visitsCSV = papa.unparse(addressVisitsWithIP);
  return visitsCSV;
}

const makeUnvisitedCSV = async () => {
  const { accountsByAddress } = await getAccounts();
  const addressVisits = await Event.find({ name: 'view_address' }).exec();
  const unvisited = clone(accountsByAddress);
  addressVisits.forEach((event) => {
    const { address } = event.metadata;
    delete unvisited[address];
  })

  const unvisitedCSV = papa.unparse(Object.values(unvisited));
  return unvisitedCSV;
}

module.exports = {
  makeVisitsCSV,
  makeUnvisitedCSV
}