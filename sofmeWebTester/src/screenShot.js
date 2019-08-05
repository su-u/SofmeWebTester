const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const urlToFileName = (_string) =>{
    const string = _string;

    const s1 = string.replace(new RegExp('(http://)|(https://)'), '');
    const s = s1.split('/');
    const result = s.join('-');
    return result;
};


const screenShot = async (url, dir) => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.setViewport({width: 1200, height: 800});
    await page.goto(url);
    await page.waitForNavigation({waitUntil:'networkidle2', timeout:5000})
        .catch(e => console.log('timeout exceed. proceed to next operation'));
    const fileName =path.join(dir, urlToFileName(url));
    await page.screenshot({path: `${fileName}.png`, fullPage:true});
    console.log("save screenshot: " + url);
    await browser.close()
};

module.exports.screenShot = screenShot;