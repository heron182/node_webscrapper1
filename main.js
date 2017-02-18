var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var url = 'http://www.comparegames.com.br/comprar/ps4';

request(url, function(error, response, html) {

            if (!error) {
                var $ = cheerio.load(html);

                $('.header').filter(function() {

                });


                fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err) {

                    console.log('File successfully written! - Check your project directory for the output.json file');

                });
            }
