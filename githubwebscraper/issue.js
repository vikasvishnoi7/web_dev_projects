const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const pdfkit = require("pdfkit");
function getIssuesPageHtml(url, topic, repoName){
    request(url,cb);
    function cb(err, response, html){
        if(err){
            console.log("err");
        }else if(response.statusCode == 404){
            console.log("Page not found");
        }else{
            // console.log(html);
            getIssueas(html);
        }
    }

    function getIssueas(html){
        let $ = cheerio.load(html);
        let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
        let arr = [];
        for(let i = 0; i < issuesElemArr.length; i++){
            let link = $(issuesElemArr[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }

        // console.log(topic,"         ",arr);

        let folderPath = path.join(__dirname, topic);
        dirCreater(folderPath);
        // let filePath = path.join(folderPath, repoName + ".json");
        let filePath = path.join(folderPath, repoName + ".pdf");
        let text = JSON.stringify(arr); 
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        // fs.writeFileSync(filePath,);
    }
}


module.exports = getIssuesPageHtml;

function dirCreater(folderPath){
    if(fs.existsSync(folderPath) == false){
        fs.mkdirSync(folderPath);
    }
}