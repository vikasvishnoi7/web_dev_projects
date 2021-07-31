let fs = require("fs");
let inputArr = process.argv.slice(2);

let optionArr = [];
let filesArr = []
for (let i = 0; i < inputArr.length; i++) {
    let firstChar = inputArr[i].charAt(0);
    if (firstChar == "-") {
        optionArr.push(inputArr[i]);
    } else {
        filesArr.push(inputArr[i]);
    }
}

for (let i = 0; i < filesArr.length; i++) {
    let ans = fs.existsSync(filesArr[i]);
    if (ans == false) {
        console.log("File doesn't exist");
        return;
    }
}
let content = "";
for (let i = 0; i < filesArr.length; i++) {
    content = content + fs.readFileSync(filesArr[i]) + "\r\n";
}
let contentArr = content.split("\r\n")

// function

function fn() {
    for (let i = 1; i < contentArr.length; i++) {
        if (contentArr[i] == "" && contentArr[i - 1] == "") {
            contentArr[i] = null;
        } else if (contentArr[i] == "" && contentArr[i - 1] == null) {
            contentArr[i] = null;
        }
    }
    let tempArr = [];
    for (let i = 0; i < contentArr.length; i++) {
        if (contentArr[i] !== null) {
            tempArr.push(contentArr[i]);
        }
    }
    return tempArr;
}


// given only path
if (optionArr.length == 0) {
    console.log(content);
}

//-s check

let isSPresent = optionArr.includes("-s");
if (isSPresent) {

    let contentSfn = fn();
    console.log(contentSfn.join("\n"));
}


for (let i = 0; i < optionArr.length; i++) {
    //-n check
    if (optionArr[i] == "-n") {
        let isNPresent = optionArr.includes("-n");
        if (isNPresent) {
            let tempnarr = [];
            for (let i = 0; i < contentArr.length; i++) {
                tempnarr[i] = `${i + 1}  ${contentArr[i]}`
            }
            // contentArr = temparr;
            console.log(tempnarr.join("\n"));
        }

    }
    //-b check
    if (optionArr[i] == "-b") {
        let isBPresent = optionArr.includes("-b");
        if (isBPresent) {
            let contentBfn = fn();
            let tempbarr = [];
            for (let i = 0; i < contentBfn.length; i++) {
                tempbarr[i] = `${i + 1}  ${contentBfn[i]}`
            }
            // contentArr = temparr;
            console.log(tempbarr.join("\n"));
        }
    }
    break;
}



