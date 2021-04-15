const router = require("express").Router();
("use strict");
var stories = [];
var scrappedLink = [];
var links = [];

router.get("/", (req, res) => {
  stories = [];
  scrappedLink = [];
  links = [];
  const puppeteer = require("puppeteer-extra");
  const pluginStealth = require("puppeteer-extra-plugin-stealth");
  puppeteer.use(pluginStealth());

  async function crawlSite() {
    try {
      process.setMaxListeners(0);

      const browser = await puppeteer.launch({
        slowmo: 250,
        ignoreDefaultArgs: ["--disable-extensions"],
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      });
      const [page] = await browser.pages();
      await page.setDefaultNavigationTimeout(0);
      await page.goto("https://newsday.co.tt/latest/");

      const elementHandles = await page.$$("a");
      const propertyJsHandles = await Promise.all(
        elementHandles.map((handle) => handle.getProperty("href"))
      );
      const hrefs2 = await Promise.all(
        propertyJsHandles.map((handle) => handle.jsonValue())
      );
      //res.json(hrefs2);
      links = hrefs2;

      var list = [];
      for (var i = 0; i < links.length; i++) {
        //console.log(this.state.scrappedLink[i]);
        var tmp = links[i];
        if (tmp.match("^https://newsday.co.tt/..../../../")) {
          if (!list.includes(tmp)) list.push(tmp);
        }
      }
      console.log(list);
      const elementHandles2 = await page.$$("a");
      const propertyJsHandles2 = await Promise.all(
        elementHandles2.map((handle) => handle.getProperty("innerHTML"))
      );
      const imgStyles = await Promise.all(
        propertyJsHandles2.map((handle) => handle.jsonValue())
      );
      //res.json(hrefs2);
      stories = imgStyles;
      //scrappedLink.shift(21);
      for (n = 0; n < 19; n++) stories.shift();
      for (n = 0; n < 28; n++) stories.pop();
      //console.log(stories);
      index = 0;
      for (m = 0; m <= stories.length; m++) {
        arr = [];
        if (stories[m] == "News") {
          for (o = m; o <= m + 2; o++) {
            //console.log(stories[o])
            arr.push(stories[o]);
          }
          arr.push(stories[m - 1]);
          for (var x = 0; x < list.length; x++) {
            tmp = list[x];
            tmp = list[x].split("/");
            tmp2 = tmp[6];
            tmp2 = tmp2.replace(/-/g, " ").replace(/ /g, "");
            //console.log(tmp2);
            tmp3 = arr[1]
              .replace(/:/g, "")
              .replace(/'/g, "")
              .replace(/,/g, "")
              .replace(/ /g, "");
            if (tmp2 == tmp3.toLowerCase()) arr.push(list[x]);
          }

          scrappedLink.push(arr);
        }
      }

      scrappedLink.forEach(myFunction);

      function myFunction(item) {
        console.log(item);
        tmp = item[3];
        //console.log(tmp);
        item[2] = item[2].replace(/\t/g, "");
        result = /\(([^)]*)\)/.exec(tmp);
        //console.log(result)
        // if (result){
        //     item[3] = result[1]
        // }else{
        //     item[3] = 'https://res.cloudinary.com/dtqlgbedo/image/upload/v1614766622/info3604project/logo_ekkdfw.png'
        // }
        item[3] = result[1];
      }

      res.status(200).json(scrappedLink);

      browser.close();
    } catch (err) {
      console.error(err);
      res.status(500).json("Server Error");
    }
  }

  crawlSite();
});

module.exports = router;
