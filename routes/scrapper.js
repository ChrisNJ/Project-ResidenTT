const router = require("express").Router(); 
'use strict'; 
var stories = []; 
var scrappedLink = [];  
var links = []



router.get('/', (req, res) => {    

    stories = [] 
    scrappedLink = [] 
    links = []
    const puppeteer = require('puppeteer-extra');  
    const pluginStealth = require('puppeteer-extra-plugin-stealth');
    puppeteer.use(pluginStealth());  
 
//     async function scrapeSite(url){ 
//     try{  
//         const browser = await puppeteer.launch({
//             userDataDir: 'C:\\tmp\\pptr', 
//             slowmo: 250, 
//             ignoreDefaultArgs: ['--disable-extensions'],
//             args: ['--no-sandbox']
//         }); 
//         process.setMaxListeners(0);
        
//         const page = await browser.newPage();  
//         await page.setDefaultNavigationTimeout(0); 
    
//         await page.goto(url);   

//         const [el] = await page.$x('//*[@id="article-featured-image"]/img'); 
//         const src = await el.getProperty('src'); 
//         const srcTxt = await src.jsonValue();  
        
        
//         const [el2] = await page.$x('//*[@id="page-content"]/div/article/header/h1'); 
//         const txt = await el2.getProperty('textContent'); 
//         const title = await txt.jsonValue();  

        
//         var data = [
//             {
//                 "img": srcTxt,
//                 "title": title,
//                 "url": url
//             }
//         ]; 
//         stories.push(data);
//         //console.log(res.json); 
//         browser.close();
//         } catch (err) {
//             console.error(err);  
//         }  
        
//     }

    async function crawlSite(){ 
        try{  
            process.setMaxListeners(0); 
            
            const browser = await puppeteer.launch({
                slowmo: 250, 
                ignoreDefaultArgs: ['--disable-extensions'],
                args: ['--no-sandbox','--disable-setuid-sandbox'] 
                
            }); 
            const [page] = await browser.pages();
            await page.setDefaultNavigationTimeout(0); 
            await page.goto('https://newsday.co.tt/latest/'); 

            const elementHandles = await page.$$('a');
            const propertyJsHandles = await Promise.all(
            elementHandles.map(handle => handle.getProperty('href'))
            );
            const hrefs2 = await Promise.all(
            propertyJsHandles.map(handle => handle.jsonValue()) 
            ); 
            //res.json(hrefs2); 
            links = hrefs2;  
            
            var list = [];   
            for (var i=0;i<links.length;i++){    
                //console.log(this.state.scrappedLink[i]); 
                var tmp = links[i];
                if (tmp.match("^https://newsday.co.tt/..../../../")){  
                    if(!list.includes(tmp)) list.push(tmp);     
                }
            }  

            const elementHandles2 = await page.$$('a');
            const propertyJsHandles2 = await Promise.all(
            elementHandles2.map(handle => handle.getProperty('innerHTML'))
            );
            const imgStyles = await Promise.all(
            propertyJsHandles2.map(handle => handle.jsonValue()) 
            ); 
            //res.json(hrefs2); 
            stories = imgStyles;  
            //scrappedLink.shift(21);  
            for( n=0 ;n<20;n++) stories.shift() 
            for( n=0 ;n<31;n++) stories.pop()
            //console.log(stories);     
            index = 0
            for(m=0;m<stories.length;m+=4){ 
                arr = []
                for(o = m;o<m+4;o++){ 
                    arr.push(stories[o]) 
                }   
                arr.push(list[index++])
                scrappedLink.push(arr)
            } 
            
            scrappedLink.forEach(myFunction);

            function myFunction(item) { 
                tmp = item[3]
                item[2] = item[2].substring(11,(item[2].length - 18))  
                result = /\(([^)]*)\)/.exec(tmp);    
                console.log(result)
                if (result){ 
                    item[3] = result[1]  
                }else{
                    item[3] = 'https://res.cloudinary.com/dtqlgbedo/image/upload/v1614766622/info3604project/logo_ekkdfw.png'
                } 
                //item[3] = result[1]
            }
            console.log(scrappedLink); 
 
            // var list = [];   
            // for (var i=0;i<scrappedLink.length;i++){    
            //     //console.log(this.state.scrappedLink[i]); 
            //     var tmp = scrappedLink[i];
            //     if (tmp.match("^https://newsday.co.tt/..../../../")){  
            //         if(!list.includes(tmp)) list.push(tmp);     
            //     }
            // } 
            // console.log(list);   

            // for(var j = 0; j<list.length;j++) scrapeSite(list[j]); 
 
            res.json(scrappedLink);

            browser.close();
        } catch (err) {
            console.error(err);
        } 
    } 
    
    crawlSite();   
//   //scrapeSite("https://newsday.co.tt/2021/02/23/priest-covid19-protocols-are-lenten-acts-of-repentance-love/");

}) 
     
module.exports = router;