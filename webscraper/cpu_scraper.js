const puppeteer = require("puppeteer");
const INTEL_SEARCH_URL =
  "https://ark.intel.com/content/www/us/en/ark/search.html";

const cpu_scraper = async (cpu) => {
  const builder = { cpu_model: cpu };
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(INTEL_SEARCH_URL);
  await page.type(`.support-searchbox#ark-searchbox`, cpu);
  await page.click(`#search-products-submit`);
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  try {
    builder["product_collection"] = await page.$eval(
      `div#bladeInside.blade-inside > ul.specs-list > li > span.value > a.ark-accessible-color.hrefcolor`,
      (a) => {
        return a.innerText;
      }
    );
  } catch (error) {
    try {
      await page.$eval(`div.search-result`, (div) => {
        return div.length;
      });
      console.log(`${cpu}: Too many options`);
    } catch (error) {
      console.log(`${cpu}: No results`);
    }
    await browser.close();
    return builder;
  }
  builder["launch_date"] = await page.$eval(
    `span[data-key=BornOnDate]`,
    (a) => {
      return a.innerText;
    }
  );
  builder["cores"] = await page.$eval(`span[data-key=CoreCount]`, (a) => {
    return +a.innerText;
  });
  builder["threads"] = await page.$eval(`span[data-key=ThreadCount]`, (a) => {
    return +a.innerText;
  });
  builder["base_clock_frequency"] = await page.$eval(
    `span[data-key=ClockSpeed]`,
    (a) => {
      let text = a.innerText;
      return +text.slice(0, text.indexOf(" GHz"));
    }
  );
  try {
    builder["max_clock_frequency"] = await page.$eval(
      `span[data-key=ClockSpeedMax]`,
      (a) => {
        let text = a.innerText;
        return +text.slice(0, text.indexOf(" GHz"));
      }
    );
  } catch (error) {
    console.log("max_clock_frequency: n/a");
    builder["max_clock_frequency"] = null;
  }

  builder["cache"] = await page.$eval(`span[data-key=Cache]`, (a) => {
    let text = a.innerText;
    return +text.slice(0, text.indexOf(" MB"));
  });
  builder["tdp"] = await page.$eval(`span[data-key=MaxTDP]`, (a) => {
    let text = a.innerText;
    return +text.slice(0, text.indexOf(" W"));
  });
  builder["max_memory_size"] = await page.$eval(
    `span[data-key=MaxMem]`,
    (a) => {
      let text = a.innerText;
      return +text.slice(0, text.indexOf(" GB"));
    }
  );
  builder["memory_type"] = await page.$eval(
    `span[data-key=MemoryTypes]`,
    (a) => {
      return a.innerText;
    }
  );
  builder["max_memory_channels"] = await page.$eval(
    `span[data-key=NumMemoryChannels]`,
    (a) => {
      return +a.innerText;
    }
  );
  await browser.close();
  return builder;
};

module.exports = cpu_scraper;
