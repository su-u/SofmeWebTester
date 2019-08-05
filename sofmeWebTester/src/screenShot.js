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


const screenShot = async (urlList, dir) => {
    const browser = await puppeteer.launch({headless: true});

    const savePage = async (element, dir) => {
        try {
            const page = await browser.newPage();
            await page.setViewport({width: 1200, height: 800});
            await page.goto(element);
            const fileName = path.join(dir, urlToFileName(element));
            console.log("save screenshot: " + element);
            await page.screenshot({path: `${fileName}.png`, fullPage: true});
        }catch (e) {
            console.log(e.stackTrace);
        }
    };

    const exList = [];
    urlList.forEach((value) =>{
        exList.push(savePage(value, dir));
    });

    await Promise.all(exList).then(() =>{
        browser.close()
    });

};

module.exports.screenShot = screenShot;