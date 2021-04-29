const readCSV = require("../readCSV");
const csvPath = "./datasheets/win7Comp.csv";
const cpu_scraper = require("../../webscraper/cpu_scraper");
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("test")
    .del()
    .then(() => {
      // Inserts seed entries
      let data = readCSV(csvPath);
      return data;
    })
    .then((data) => {
      let transformedData = data.map((name) => {
        return { product_names: name };
      });
      return knex("test").insert(transformedData);
    });
};
