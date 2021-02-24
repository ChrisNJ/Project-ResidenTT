const router = require("express").Router(); 
'use strict'; 
var stories = []; 
var scrappedLink = []; 

router.get('/', (req, res) => {  
    const puppeteer =require('puppeteer'); 
  
    async function scrapeSite(url){ 
    try{
        const browser = await puppeteer.launch(); 
        const page = await browser.newPage(); 
    
        await page.goto(url); 
        const [el] = await page.$x('//*[@id="article-featured-image"]/img'); 
        const src = await el.getProperty('src'); 
        const srcTxt = await src.jsonValue();  

        const [el2] = await page.$x('//*[@id="page-content"]/div/article/header/h1'); 
        const txt = await el2.getProperty('textContent'); 
        const title = await txt.jsonValue();  

        //console.log(res.json);
        console.log({srcText,title,url}); 
    
        browser.close();  
        } catch (err) {
            console.error(err);  
        } 
    }

    async function crawlSite(){ 
        try{
            const browser = await puppeteer.launch();
            const [page] = await browser.pages();

            await page.goto('https://newsday.co.tt/latest/'); 

            const elementHandles = await page.$$('a');
            const propertyJsHandles = await Promise.all(
            elementHandles.map(handle => handle.getProperty('href'))
            );
            const hrefs2 = await Promise.all(
            propertyJsHandles.map(handle => handle.jsonValue()) 
            ); 
            res.json(hrefs2); 
            scrappedLink = hrefs2; 
            console.log(scrappedLink); 

            var list = [];
            for (var i=0;i<scrappedLink.length;i++){  
                //console.log(this.state.scrappedLink[i]); 
                var tmp = scrappedLink[i];
                if (tmp.match("^https://newsday.co.tt/..../../../")){  
                    if(!list.includes(tmp)) list.push(tmp);     
                }
            } 
            console.log(list);   

            for(var j = 0; j<list.length;j++) scrapeSite(list[j]);

        } catch (err) {
            console.error(err);
        }
    } 
    
    crawlSite();   
  //scrapeSite("https://newsday.co.tt/2021/02/23/priest-covid19-protocols-are-lenten-acts-of-repentance-love/");
  }) 
  
  
  

module.exports = router;