require('dotenv').config();
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT;
const router = express.Router();
const routes = require('./routes/index');

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
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
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
router.get('/', logger, (req,res)=>{
	return routes.indexRoute(req,res)
});

router.post('/register', logger, (req, res) => {
  return routes.registerRoute(req, res);
});

router.post('/login', logger, (req, res) => {
  return routes.loginRoute(req, res);
});

router.all('*', (req,res)=>{
	res.send('404')
})
