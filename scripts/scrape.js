// scrape script
// =============

// Require request and cheerio
var request = require("request");
var cheerio = require("cheerio");


var scrape = function(cb) {
  request("https://www.nytimes.com/section/world", function(err, res, body) {

    var $ = cheerio.load(body);
    var articles = [];

    $(".theme-summary").each(function(i, element) {
      var head = $(element).find("h2.headline").text().trim();
      var url = $(element).find("a").attr("href");
      var sum = $(element).find("p.summary").text().trim();

        var dataToAdd = {
          headline: head,
          summary: sum,
          url: url
        };
        articles.push(dataToAdd);
      
    });
    cb(articles);
  });
};

// Export the function, so other BE files can use
module.exports = scrape;