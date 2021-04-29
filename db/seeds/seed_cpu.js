const readCSV = require("../readCSV");
const csvPath = "./datasheets/cpu-prio-1.csv";
const cpu_scraper = require("../../webscraper/cpu_scraper");
const { Cluster } = require("puppeteer-cluster");
const CPU_TABLE_NAME = "cpu";
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex(CPU_TABLE_NAME)
    .del()
    .then(() => {
      // Read CPU's and filter uniques
      const processors = readCSV(csvPath).then((result) => {
        const unique = result.filter((x, i, a) => a.indexOf(x) == i);
        return unique;
      });
      return processors;
    })
    .then(async (cpuList) => {
      // Scraoe CPU specs
      // Use puppeteer-cluster to control # of puppeteer instances running
      const cpus = (async () => {
        let list = [];
        const cluster = await Cluster.launch({
          concurrency: Cluster.CONCURRENCY_CONTEXT,
          maxConcurrency: 2,
        });

        await cluster.task(async ({ data: cpu }) => {
          list.push(await cpu_scraper(cpu));
        });
        await cpuList.forEach((cpu) => {
          cluster.queue(cpu);
        });
        await cluster.idle();
        await cluster.close();
        return list;
      })();
      return cpus;
    })
    .then((cpuSpecs) => {
      // Resolve promises to array of specs
      let processors = Promise.all(cpuSpecs).then((results) => results);
      return processors;
    })
    .then((cpuSpecs) => {
      // insert specs
      cpuSpecs.forEach((spec) => {
        try {
          knex(CPU_TABLE_NAME)
            .insert(spec, "cpu_model")
            .then(() => {
              console.log("inserted cpu");
            })
            .catch((err) => {
              console.log("here's the catch:", err);
            });
        } catch (error) {
          console.log("error:", error);
        }
      });
    });
};
