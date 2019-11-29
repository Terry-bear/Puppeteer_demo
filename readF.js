const fs = require("fs");
const path = require("path");

function readFiles(fileName) {
  const filePath = path.resolve(`./data/${fileName}.json`);
  const data = fs.readFileSync(filePath);
  const fmDataArr = JSON.parse(data).RECORDS;
  return fmDataArr.map(item => ({ID: item.ID}));
}

module.exports = { readFiles }
