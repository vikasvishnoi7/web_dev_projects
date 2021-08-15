// let url =
  // "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
let path = require("path");
function processSinglematch(url){

request(url, cb);

}
// let currentPath = process.cwd();
// let folderPath = path.join(currentPath, "ipl");
// dirCreater(folderPath);

// request(url, cb);
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

  let matchinfo = searchTool(
    ".match-info.match-info-MATCH.match-info-MATCH-half-width"
  );
  let matchinfotext = matchinfo.text();
  // console.log(matchinfotext)
  let matchinfoArr = matchinfotext.split(",");
  let venue = matchinfoArr[1].trim();
  let date = matchinfoArr[2].trim();
  // console.log(venue);
  // console.log(date);

  let resultinfo = searchTool(
    ".match-info.match-info-MATCH.match-info-MATCH-half-width .status-text"
  );
  let result = resultinfo.text().trim();
  // console.log(result);

  //   team name
  let bothInningsArr = searchTool(".Collapsible");
  let NameoFTeams = searchTool(".Collapsible h5");

  //   let scoreCard = "";
  for (let i = 0; i < NameoFTeams.length; i++) {
    // scoreCard = searchTool(bothInningsArr[i]).html();
    // let teamNameElem = searchTool(bothInningsArr[i]).find("h5");
    // let teamName = teamNameElem.text();
    // console.log(teamName);
    // let myTeamName = teamName.split("INNINGS")[0];
    // myTeamName = myTeamName.trim()                                  ;
    // // console.log("myTeamName",myTeamName);


    let batsManTableBodyAllRows = searchTool(bothInningsArr[i]).find(
      ".table.batsman tbody tr"
    );
    // console.log(batsManTableBodyAllRows.length);
    for (let j = 0; j < batsManTableBodyAllRows.length; j++) {
      let numberofTds = searchTool(batsManTableBodyAllRows[j]).find("td");
      if (numberofTds.length == 8) {
        let myTeamName = searchTool(NameoFTeams[i]).text().split("INNINGS")[0];
        myTeamName = myTeamName.trim();
        // console.log("myTeamName", myTeamName);

        let opponentTeamName;
        if (i == 0) {
          opponentTeamName = searchTool(NameoFTeams[1]).text();
          opponentTeamName = opponentTeamName.split("INNINGS")[0].trim();
          // console.log("opponentTeamName", opponentTeamName);
        } else {
          opponentTeamName = searchTool(NameoFTeams[0]).text();
          opponentTeamName = opponentTeamName.split("INNINGS")[0].trim();
          // console.log("opponentTeamName", opponentTeamName);
        }

        let playerName = searchTool(numberofTds[0]).text();
        let runs = searchTool(numberofTds[2]).text();
        let balls = searchTool(numberofTds[3]).text();
        let fours = searchTool(numberofTds[5]).text();
        let sixes = searchTool(numberofTds[6]).text();
        let sr = searchTool(numberofTds[7]).text();
        console.log(`teamName ${myTeamName} playerName ${playerName} venue ${venue} Date ${date} 
        opponent ${opponentTeamName} result ${result} runs ${runs} balls ${balls} fours ${fours} 
        sixes ${sixes} sr ${sr}`);

        storePlayerDetail(myTeamName, playerName, venue, date, opponentTeamName, result, runs, balls, fours, sixes, sr);
      }
    }
    console.log("````````````````````````````````");
    // fs.writeFileSync(`innings${i+1}.html`, scoreCard);
  }
}

function storePlayerDetail(myTeamName, playerName, venue, date, opponentTeamName, result, runs, balls, fours, sixes, sr) {
  let currentPath = process.cwd();
  // let currentPath ="D:\\PP_12_21\\JS\\Module_2_Webscarping\\activity\\cricinfo"
  let folderPath = path.join(currentPath, "ipl", myTeamName);
  dirCreater(folderPath);
  
  let filePath = path.join(folderPath, playerName + ".json");
  
  let content = [];
 
  let matchobj = {
    myTeamName, playerName, venue, date,
    opponentTeamName, result, runs, balls, fours, sixes, sr
  }

  if (fs.existsSync(filePath)) {
    let buffer = fs.readFileSync(filePath);
    content = JSON.parse(buffer);
  }
  content.push(matchobj);
  let jsonWrite = JSON.stringify(content);
  fs.writeFileSync(filePath, jsonWrite);
}

function dirCreater(folderPath) {
  if (fs.existsSync(folderPath) == false) {
      fs.mkdirSync(folderPath);
  }
}
module.exports = {
    psm: processSinglematch
}
