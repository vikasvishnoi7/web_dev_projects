let request = require("request");
let cheerio = require("cheerio");
let path = require("path");
let fs = require("fs");

let currentPath = process.cwd();

let folderPath = path.join(currentPath, "ipl");
dirCreater(folderPath);

let scoreCardObj = require("./scoreCard")

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url, cb);
function cb(error, response, html) {
  if (error) {
    console.log(error);
  } else if (response.ststusCode == 404) {
    console.log("Page Node Found");
  } else {
    dataExtracter(html);
  }
}

function dataExtracter(html) {
  let searchTool = cheerio.load(html);

  let anchorrep = searchTool('a[data-hover="View All Results"]');
  let link = anchorrep.attr("href");
  let fullAllmatchPageLink = `https://www.espncricinfo.com${link}`;
  console.log(fullAllmatchPageLink);

  request(fullAllmatchPageLink, AllmatchPageCb);
}

function AllmatchPageCb(error, response, html) {
  if (error) {
    console.log(error);
  } else if (response.ststusCode == 404) {
    console.log("Page Node Found");
  } else {
    // console.log(html);
    getAllScoreCardLink(html);
  }
}

function getAllScoreCardLink(html) {
  console.log("`````````````````````");  
  let searchTool = cheerio.load(html);
  let scorecardsArr = searchTool('a[data-hover="Scorecard"]');
  for(let i = 0; i < scorecardsArr.length; i++){
      let link = searchTool(scorecardsArr[i]).attr("href");
      let fullAllmatchPageLink = `https://www.espncricinfo.com${link}`;
    //   console.log(fullAllmatchPageLink);
      scoreCardObj.psm(fullAllmatchPageLink);

  }

}

function dirCreater(folderPath) {
  if (fs.existsSync(folderPath) == false) {
      fs.mkdirSync(folderPath);
  }
}