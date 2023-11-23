const puppeteer = require("puppeteer");
const { PuppeteerScreenRecorder } = require("puppeteer-screen-recorder");

(async () => {
  try {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    //////////str recording this video file

    const recorder = new PuppeteerScreenRecorder(page);

    await recorder.start("./output.mp4");

    await page.goto("https://interactly.video/");

    // Scroll to the bottom of the page
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        const distance = 150;
        const scrollInterval = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, 100); // Adjust scroll speed if needed
      });
    });

    // stop the recording
    await recorder.stop();
    await browser.close();
  } catch (error) {
    console.error("An error occurred:", error);
    process.exit(1);
  }
})();
