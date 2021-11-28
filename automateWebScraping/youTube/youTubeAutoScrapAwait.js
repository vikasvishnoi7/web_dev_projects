// a. Name of Playlist,view
// b. Total No of videos : 792
// c. actual No of videos :783
// d. Total length of playlist : 12 hours, 9 minutes, 12 seconds
// At 1.25x : 9 hours, 43 minutes, 21 seconds
// At 1.50x : 8 hours, 6 minutes, 8 seconds
// At 1.75x : 6 hours, 56 minutes, 41 seconds
// At 2.00x : 6 hours, 4 minutes, 36 seconds
// Average length of video : 29 minutes, 10 seconds

// e. console.table=>  of video number,name,time



// Current Task : name of playlist ,views,total videos, 


const puppeteer = require("puppeteer");
//npm install pdfkit
const pdf = require("pdfkit");
const fs = require("fs");
const { format } = require("path/posix");
let page;
(async function fn() {
    let browser = await puppeteer.launch({
        headless: false, defaultViewport: null,
        args: ["--start-maximized"],
    })
    page = await browser.newPage();
    await page.goto("https://www.youtube.com/playlist?list=PLzkuLC6Yvumv_Rd5apfPRWEcjf9b1JRnq");
    await page.waitForSelector('h1[id="title"]');
    // first element get by $
    //selector h1[id="title"] -> use -> get playList name
    let element = await page.$('h1[id="title"]');
    // evaluate function takes -> function and arguaments
    let value = await page.evaluate(function cb(element) {
        // find text in html -> use -> selector h1[id="title"]
        return element.textContent;
    }
        , element);

    /** 
     * as same as -> upper function
    let value = await page.evaluate(function (select) { 
        return document.querySelector(select).innerText 
    },'h1[id="title"]');
    */

    //print -> playList Title
    console.log("Title", value)
    //someList brings array -> like videos, view,...
    let someList = await page.$$(".style-scope.ytd-playlist-sidebar-primary-info-renderer");
    // evaluate -> videos
    value = await page.evaluate(
        function (element) { return element.textContent }, someList[5]);
    //print -> no. of videos    
    console.log("videos", value)
    // only no.of videos -> this : 792 -> Not this : 792 videos
    let videos = value.split(" ")[0].trim();
    // evaluate -> views
    value = await page.evaluate(
        function (element) { return element.textContent }, someList[6]);
    //print -> no. of views
    console.log("views", value)
    // no of views -> playlist  
    // list first 100 videos console.table=>  of video number,name,// time

    // one time load 100 videos in current page
    let loopcount = Math.floor(videos / 100);
    // load all videos
    for (let i = 0; i < loopcount; i++) {
        // load start 
        await page.click(".circle.style-scope.tp-yt-paper-spinner");
        // load finish
        // waitTillHTMLRendered function check -> page load huaa -> new videos aaye page me
        await waitTillHTMLRendered(page);
        console.log("loaded the new videos");
    }
    // loader -> scroll 
    // get all videos Name in array -> videoNameElementList
    let videoNameElementList = await page.$$("a[id='video-title']");
    // console.log("videoNameElementList", videoNameElementList.length);

    // last video 
    let lastVideo = videoNameElementList[videoNameElementList.length - 1];
    console.log("videoNameElementList", videoNameElementList.length);

    // last video -> view
    await page.evaluate(function (elem) {
        elem.scrollIntoView();
    }, lastVideo);

    console.log("videoNameElementList", videoNameElementList.length);
    // time 
    let timeList = await page.$$("span[id='text']");
    console.log(timeList.length);

    // create pdf
    let pdfDoc = new pdf;
    pdfDoc.pipe(fs.createWriteStream("play.pdf"));

    // videosArr function -> contains -> time , video name
    let videosArr = [];
    for (let i = 0; i < timeList.length; i++) {
        let timeNTitleObj = await page.evaluate(getTimeAndTitle, timeList[i], videoNameElementList[i]);
        videosArr.push(timeNTitleObj);

        pdfDoc.font('Courier').fontSize(14).fillColor('black').text(JSON.stringify(timeNTitleObj), { bold: true, });
        pdfDoc.moveDown(0.5);
    }
    // print alldata -> table format
    console.table(videosArr);

    // pdf
    pdfDoc.end();

})();

// getTimeAndTitle function return -> video duration, video name
function getTimeAndTitle(element1, element2) {
    return {
        time: element1.textContent.trim(),
        title: element2.textContent.trim()
    }
}


//  waitTillHTMLRendered function check -> did page load -> new videos page me aaye (new html load huaa)
const waitTillHTMLRendered = async (page, timeout = 10000) => {
    const checkDurationMsecs = 1000;
    const maxChecks = timeout / checkDurationMsecs;
    let lastHTMLSize = 0;
    let checkCounts = 1;
    let countStableSizeIterations = 0;
    const minStableSizeIterations = 3;

    while (checkCounts++ <= maxChecks) {
        let html = await page.content();
        let currentHTMLSize = html.length;

        let bodyHTMLSize = await page.evaluate(() => document.body.innerHTML.length);

        console.log('last: ', lastHTMLSize, ' <> curr: ', currentHTMLSize, " body html size: ", bodyHTMLSize);

        if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
            countStableSizeIterations++;
        else
            countStableSizeIterations = 0; //reset the counter

        if (countStableSizeIterations >= minStableSizeIterations) {
            console.log("Page rendered fully..");
            break;
        }

        lastHTMLSize = currentHTMLSize;
        await page.waitFor(checkDurationMsecs);
    }
};