var express = require('express');
var proffdkscraper = require('./proffdkscraper.js');
var port = process.env.port || 1337;
var app = express();
app.use(express.methodOverride());

// ## CORS middleware
// see: http://stackoverflow.com/questions/7067966/how-to-allow-cors-in-express-nodejs
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.send(200);
    }
    else {
      next();
    }
};
app.use(allowCrossDomain);


app.get('/cvr/:id', function(req, res)
    {
    proffdkscraper.getCompanyData(req.params.id,function(body) {
        res.send(body);
    });
    });

app.get('/', function(req, res)
    {
        res.send('hello');
        });

app.listen(port);
