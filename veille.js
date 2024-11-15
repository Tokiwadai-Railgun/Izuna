const Parser = require("rss-parser");
const parser = new Parser();

(async () => {

    let feed = await parser.parseURL('https://www.google.fr/alerts/feeds/07965809146792001993/5571566369516917599');

    console.log(feed.title);
  
    feed.items.forEach(item => {
      console.log(item.title + ': \n' + ' Link -> ' + item.link)
      console.log("-------")
    });
  
})();