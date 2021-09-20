const loginLink = "https://play.google.com/store/apps?utm_source=apac_med&utm_medium=hasem&utm_content=Jul0121&utm_campaign=Evergreen&pcampaignid=MKT-EDR-apac-in-1003227-med-hasem-ap-Evergreen-Jul0121-Text_Search_BKWS-BKWS%7cONSEM_kwid_43700064490253541_creativeid_480915691333_device_c&gclid=Cj0KCQjwnJaKBhDgARIsAHmvz6c9_o4tOtcPXGQhjx3YRxgNNY4ynoITAMyOoIGMVQQ-301D78oWh2saAkR7EALw_wcB&gclsrc=aw.ds";
let puppeteer = require("puppeteer");
let cheerio = require('cheerio');
const pdf = require("pdfkit");
const fs = require('fs')
const path = require('path')
let page;
let alldata = [];
(async function fn() {
    try{
        let browserStartPromise = puppeteer.launch({
            // visible 
            headless: false,
            
            defaultViewport: null,
            // browser setting 
            args: ["--start-maximized","--disable-notifications"]
        });

        let browserObj = await browserStartPromise;
        console.log("Browser Opened");
        browser = browserObj
        page = await browserObj.newPage();
        //open hackerrank login page
        await page.goto(loginLink);
        await page.waitForSelector('#gbqfq.gbqfif');
        await page.type("#gbqfq.gbqfif", "books", { delay: 50 });
        await page.click('button>[class="gbqfi gb_rc"]');

        await page.waitForTimeout(3000);
        
        // scroll
        let lastHeight = await page.evaluate('document.body.scrollHeight');
        while (true) {
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)');
            await page.waitForTimeout(3000); // sleep a bit
            let newHeight = await page.evaluate('document.body.scrollHeight');
            if (newHeight === lastHeight) {
                break;
            }
            lastHeight = newHeight;
        }
        
        const content = await page.content();

        const $ = cheerio.load(content);
          
        console.log($);
        const titlelink = [];
        const bookn = [];
        links = $('.ZmHEEd [class="uMConb  V2Vq5e POHYmb-eyJpod YEDFMc-eyJpod y1APZe-eyJpod drrice"] .Vpfmgd .b8cIId.ReQCgd.Q9MA7b>a'); //jquery get all hyperlinks
        $(links).each(function (i, link) {
            // console.log($(link).text() + ':\n  ' + $(link).attr('href'));
            let book = $(link).text();
            // console.log(book);
            bookn.push(book)

            let fullLinkss = $(link).attr('href');
            let full = `https://play.google.com${fullLinkss}`;
            // console.log(full);
            titlelink.push(full);
        });
        console.log(titlelink.length);

        while(true){
            if (bookn[0] == "Google Play Books & Audiobooks"){
                break;
            }else{
                titlelink.shift();
                bookn.shift();
            }
        }
        console.log(titlelink.length);
        console.log(titlelink);
        console.log(bookn);
        let arrofdeatil = [];
    
        for(let detail = 0; detail < titlelink.length - 200; detail++){
            
           let bdata = await geteachdatafpage(page, titlelink[detail]);
            console.log(bdata);
            arrofdeatil.push(bdata);
        }
        // console.log(arrofdeatil[0])
        
        // console.log(arrofdeatil[0].raitingc)

        // console.log(arrofdeatil.length)
        

        for (let i = 0; i < arrofdeatil.length; i++) {
            alldata.push({ "titlelink": titlelink[i], "bookn": bookn[i], "raitingc": arrofdeatil[i].raitingc, "Updated": arrofdeatil[i].Updated, "Size": arrofdeatil[i].Size, "Installs": arrofdeatil[i].Installs, "CurrentVersion": arrofdeatil[i].CurrentVersion, "RequiresAndroid": arrofdeatil[i].RequiresAndroid, "Contentrating": arrofdeatil[i].Contentrating, "InteractiveElements": arrofdeatil[i].InteractiveElements, "OfferedBy": arrofdeatil[i].OfferedBy})
        }
        // console.table(itemToBuy);
        // console.log(itemToBuy);
        // console.log(itemToBuy.length);
        
        
        // create pdf
        let pdfDoc = new pdf;
        pdfDoc.pipe(fs.createWriteStream("alldata.pdf"));
        pdfDoc.text(JSON.stringify(alldata));
        pdfDoc.end();
        
        
    } catch{
        console.log(err);
    }
})()

//get data from each page
async function geteachdatafpage(page, titlelink) {
    
    await page.goto(titlelink);
    await page.waitForSelector('[class="BHMmbe"]', { visible: true });
   
    const element = await page.$('[class="BHMmbe"]');
    const raitingc = await page.evaluate(element => element.textContent, element);
    console.log(raitingc);
    
    
    const element1 = await page.$$('[class="IQ1z0d"] [class="htlgb"]');
    const Updated = await page.evaluate(element1 => element1.textContent, element1[0]);
    console.log(Updated);
    const Size = await page.evaluate(element1 => element1.textContent, element1[1]);
    console.log(Size);

    const Installs = await page.evaluate(element1 => element1.textContent, element1[2]);
    console.log(Installs);

    const CurrentVersion= await page.evaluate(element1 => element1.textContent, element1[3]);
    console.log(CurrentVersion);

    const RequiresAndroid = await page.evaluate(element1 => element1.textContent, element1[4]);
    console.log(RequiresAndroid);

    const Contentrating = await page.evaluate(element1 => element1.textContent, element1[5]);
    console.log(Contentrating);

    const InteractiveElements = await page.evaluate(element1 => element1.textContent, element1[6]);
    console.log(InteractiveElements);
    
    const OfferedBy = await page.evaluate(element1 => element1.textContent, element1[9]);
    console.log(OfferedBy);

    return{
        raitingc,
        Updated,
        Size,
        Installs,
        CurrentVersion,
        RequiresAndroid,
        Contentrating,
        InteractiveElements,
        OfferedBy
    }
}

