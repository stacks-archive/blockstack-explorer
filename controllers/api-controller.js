const express = require('express');

const makeAPIController = (accounts) => {
  const APIController = express.Router();

  APIController.get('/accounts/:address', (req, res) => {
    console.log('api request');
    const account = accounts[req.params.address];

    res.json(account);
  });

  return APIController;
};

module.exports = makeAPIController;
