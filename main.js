/* jshint esversion:6 */
// TODO provide command line usage on which consoles are availables ps4|xbox|ps3 etc
// TODO order games by price before stringify´em
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var choosen_console = process.argv[2];
var url = `http://www.comparegames.com.br/comprar/${choosen_console}`;

request(url, function(error, response, html) {

    if (!error) {
        let $ = cheerio.load(html);
        let arr = [];
        $('li.gm-ctn').each(function(i, ele) {
            title = $(this).find('p.name').text();
            metacritic = !!$(this).find('p.mtrc').text() ? $(this).find('p.mtrc').text().replace(/\D/g, '') : 'N/A';
            currency = $(this).find('span.cg-prc').text().replace(/\s/g, '');
            game_obj = {
                title: title,
                metacritic: metacritic,
                currency: currency
            };
            arr.push(game_obj);
        });

        fs.writeFile(`${choosen_console}.json`, JSON.stringify(arr, null, 4), function(err) {

            console.log('Json file written succesfully!');

        });
    }

});
