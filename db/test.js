const readCSV = require("./csv_processor");
const csvPath = "db/datasheets/win7Comp.csv";
(async () => {
  let data = await readCSV(csvPath);
  console.log("data:", data);
})();
