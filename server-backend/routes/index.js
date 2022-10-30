const express = require('express');
const router = express.Router();

const registerController = require('../controllers/registerController');

const loginController = require('../controllers/loginController');

// main route
const indexRoute = (req, res) => {
  res.send('hello from main');
};
// when posting
const registerRoute = (req, res) => {
  return registerController(req, res);
};
const loginRoute = (req, res) => {
  return loginController(req, res);
};

module.exports = { indexRoute, registerRoute, loginRoute };
