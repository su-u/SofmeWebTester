const puppeteer = require('puppeteer');

const screenShot = async (url) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 800});
    await page.goto(url);
    await page.waitForNavigation({waitUntil:'networkidle2', timeout:5000})
        .catch(e => console.log('timeout exceed. proceed to next operation'));
    const fileName = new RegExp('.+(?!=//)');
    await page.screenshot({path: `${url}.png`, fullPage:true});
    console.log("save screenshot: " + url);
    await browser.close()
};

module.exports.screenShot = screenShot;