const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const request = require('request');
import config from './config';
import { parsePrimitive } from "./PEGParser";


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json);
app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

let port = process.env.PORT || 3001;

const router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
  res.json({ message: 'This is the api' });
});

router.post('/java', function(req, res) {
  const input = {
    "files": [{"name": "Main.java", "content": req.body.data}]
  };
  request({
    headers: {
      'Authorization': "Token " + config.glot_token,
      'Content-Type': 'application/json'
    },
    uri: 'https://run.glot.io/languages/java/latest',
    body: JSON.stringify(input),
    method: 'POST'
  }, function (error, response, body) {
    res.json(response.body);
  })
});

router.post('/primitive', function(req, res) {
  const input = {
    "files": [{"name": "Main.java", "content": parsePrimitive(req.body.data)}]
  };
  request({
    headers: {
      'Authorization': "Token " + config.glot_token,
      'Content-Type': 'application/json'
    },
    uri: 'https://run.glot.io/languages/java/latest',
    body: JSON.stringify(input),
    method: 'POST'
  }, function (error, response, body) {
    res.json(response.body);
  })
});

app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Started on port ' + port);
