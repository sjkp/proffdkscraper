var request = require('request');
var cheerio = require('cheerio');

function getCompanyData(cvr, cb) {
    var self = this;
    self.doSearch = function (cvr, cb) {
        request.get('http://www.proff.dk/branches%C3%B8g?q='+cvr,function(err,req,body)
        {
            $ = cheerio.load(body);
            cb('http://www.proff.dk'+$('header a', $('.search-block-wrap').first()).attr('href'));
        });
    };
   
    self.getData = function (companyUrl, cb) {
        request.get(companyUrl, function (err, req, body) {

            $ = cheerio.load(body);
            var rows = $('#accountsTable > tbody tr');
            var ret = {};
            rows.each(function(i,o)
                {
                        var obj = $(o);
                        ret[$('th',obj).text()] = obj.data('chart');                        
                    });
            cb(ret);
        });
    };

    this.doSearch(cvr, function (url) { self.getData(url, cb); });
};

exports.getCompanyData = getCompanyData;