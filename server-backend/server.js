require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const routes = require('./routes/index');
const { body, validationResult } = require('express-validator');

// middleware
const logger = (req, res, next) => {
  fs.appendFile(
    './logs/log.txt',
    `## Request Time: ${Date.now()} - Request Method: ${
      req.method
    } - Request URL: ${req.url} ##\n`,
    function (err) {
      if (err) {
        return console.log(err);
      }
    }
  );
  next();
};
app.use(logger);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);
//custom middleware
// req info logger

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log('#### Application Running ####');
      console.log(`Server Running Here: http://localhost:${PORT}`);
      console.log('#########');
    });
  } catch (err) {
    console.log('#########');
    console.log(err);
    console.log('#########');
  }
};

startServer();

// Backend Index Route
router.get('/', logger, (req, res) => {
  return routes.indexRoute(req, res);
});

// registeration call
router.post(
  '/register',
  logger,
  body('fname')
    .isLength({ min: 2, max: 15 })
    .matches(/^[A-Za-z]+$/),
  body('lname')
    .isLength({ min: 2, max: 15 })
    .matches(/^[A-Za-z]+$/),
  body('phone').matches(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
  body('email').isEmail(),
  body('username').matches(
    /^(?=.{7,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  ),
  body('password').matches(
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/
  ),
  body('dob').matches(
    /(?:\d{1,2}[-/\s]\d{1,2}[-/\s]'?\d{2,4})|(?:\d{2,4}[-/\s]\d{1,2}[-/\s]\d{1,2})|(?:(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)[\s-/,]*?\d{1,2}(?:\s)*(?:rd|th|st)?(?:\s)*[-/,]?(?:\s)*'?\d{2,4})|(?:\d{1,2}(?:\s)*(?:rd|th|st)?(?:\s)*(?:January|February|March|April|May|June|July|August|September|October|November|December|Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sept|Sep|Oct|Nov|Dec)(?:\s)*?[-/,]?(?:\s)*'?\d{2,4})/
  ),
  body('zip').matches(/^(\d{5}(-\d{4})?|[A-Z]\d[A-Z] ?\d[A-Z]\d)$/),
  (req, res) => {
    const errors = validationResult(req);
    // if we have error return error and stop.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // if no error you will continue to register controller
    return routes.registerRoute(req, res);
  }
);

// login call
router.post(
  '/login',
  logger,
  body('username').matches(
    /^(?=.{7,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
  ),
  body('password').matches(
    /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{8,16}$/
  ),
  (req, res) => {
    const errors = validationResult(req);
    // if we have error return error and stop.
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    return routes.loginRoute(req, res);
  }
);

// catch all unknown requests
router.all('*', (req, res) => {
  res.send('404');
});
