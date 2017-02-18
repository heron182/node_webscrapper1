var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var url = 'http://www.comparegames.com.br/comprar/ps4';

request(url, function(error, response, html) {

    if (!error) {
        var $ = cheerio.load(html);
        var arr = [];
        $('li.gm-ctn').each(function(i, ele) {
            title = $(this).find('p.name').text();
            metacritic = !!$(this).find('p.mtrc').text() ? $(this).find('p.mtrc').text().replace(/\D/g,'') : 'N/A';
            currency = $(this).find('span.cg-prc').text().replace(/\s/g, '');
            game_obj = {
                title: title,
                metacritic: metacritic,
                currency: currency
            };
            arr.push(game_obj);
        });

        fs.writeFile('output.json', JSON.stringify(arr, null, 4), function(err) {

            console.log('Json file written succesfully!');

        });
    }

});
