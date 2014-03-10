var express = require('express');
var proffdkscraper = require('./proffdkscraper.js');
var port = process.env.port || 1337;
var app = express();

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
