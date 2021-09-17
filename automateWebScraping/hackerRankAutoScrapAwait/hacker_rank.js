const loginLink = "https://www.hackerrank.com/auth/login";
let puppeteer = require("puppeteer");
const emailpassObj = require("./secrets");
const { answers } = require("./codes");

let page, browser;
(async function fn() {
    try {
        let browserStartPromise = puppeteer.launch({
            // visible 
            headless: false,
            // type 1sec // slowMo: 1000,
            defaultViewport: null,
            // browser setting 
            args: ["--start-maximized", "--disable-notifications"]
        });

        let browserObj = await browserStartPromise;
        console.log("Browser Opened");
        browser = browserObj
        page = await browserObj.newPage();
        //open hackerrank login page
        await page.goto(loginLink);
        // Enter gmail
        await page.type("input[id='input-1']", emailpassObj.email, { delay: 50 });
        // Enter password
        await page.type("input[type='password']", emailpassObj.password, { delay: 50 });
        //Login botton click
        await page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
        //Interview Preparation Kit -> click on 'Continue Practice'
        await waitAndClick(".ui-btn.ui-btn-normal.ui-btn-large.ui-btn-primary.ui-btn-link.ui-btn-styled");
        //Warm-up Challenges -> click on 'See Challenges'
        await waitAndClick("a[data-attr1='warmup']");
        //waiting for a questions -> no. of questions = 4;
        await page.waitForSelector("a[data-analytics='ChallengeListChallengeName']", { visible: true });
        //get all questions links (4 questions links) in linksArr
        let linksArr = await page.evaluate(function () {
            let allElem = document.querySelectorAll("a[data-analytics='ChallengeListChallengeName']");
            let linksArr = [];
            for (let i = 0; i < allElem.length; i++) {
                let href = allElem[i].getAttribute("href");
                linksArr.push(href);
            }
            return linksArr;
        })
        console.log(linksArr.length);
        // all questions one by one submiting
        for (let i = 0; i < linksArr.length; i++) {
            // create full link
            let link = "https://www.hackerrank.com" + linksArr[i];
            // call function -> submitCode -> pass -> link and i(answer index) 
            await submitCode(link, i);
        }


    } catch (err) {
        console.log(err);
    }


})()



//waitAndClick function
async function waitAndClick(selector) {
    try {
        //wait for a selector
        await page.waitForSelector(selector, { visible: true });
        //click on selector
        await page.click(selector);
        console.log("done");
    }
    catch (err) {
        return new Error(err);
    }
}

//submitcode function -> question answer submiting
async function submitCode(link, index) {
    try {
        // goto question page
        await page.goto(link);
        // wait for a checkbox and click on checkbox 
        await waitAndClick(".checkbox-input");
        //waiting for custominput
        await page.waitForSelector(".custominput", { visible: true });
        // typing in custominput
        await page.type(".custominput", answers[index], { delay: 10 });
        //copy paste Code
        await page.keyboard.down("Control");
        // ctrl + a -> all selected
        await page.keyboard.press("a");
        // ctrl + x
        await page.keyboard.press("x");
        // click on editor
        await page.click(".monaco-editor.no-user-select.vs");
        // ctrl + a -> all selected
        await page.keyboard.press("a");
        // ctrl + v -> paste
        await page.keyboard.press("v");
        // click on submit button
        await page.click(".hr-monaco-submit");
        await page.keyboard.up("Control");


    }
    catch {
        console.log(err);
    }
}




