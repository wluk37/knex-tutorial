const fs = require("fs");
const parse = require("csv-parse");
// const csvPath = "./datasheets/";
// a fn that takes in a .csv file and reads it
const readCSV = (csvPath) => {
  const fd = fs.createReadStream(csvPath);
  const csvData = [];
  const createReadStreamAsync = new Promise((resolve, reject) => {
    fd.pipe(parse())
      .on("data", function (csvrow) {
        //   console.log(csvrow);
        csvData.push(csvrow[0]);
      })
      .on("end", function () {
        // console.log("csvData:", csvData);
        resolve(csvData);
      })
      .on("error", reject);
  });
  return createReadStreamAsync;
};

module.exports = readCSV;
