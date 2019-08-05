const getUrlList = require('./UrlList').getUrlList;
const writer = require('./writeFile').writer;
const fs = require('fs');
const webdriver = require('selenium-webdriver');
const screenShot = require('./screenShot').screenShot;
const Enumerable = require('linq');

const { promisify } = require('util');
const { Builder, By, until } = webdriver;
const capabilities = webdriver.Capabilities.chrome();
capabilities.set('chromeOptions', {
    args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        `--window-size=1980,1200`
    ]
});

const main = () => {
    getUrlList('http://softmedia.sakura.ne.jp/', 5)
        .then(result => {
            console.log(result.insideUrl);
            console.log(result.outsideUrl);

            const urlList = Enumerable.from(result.insideUrl).distinct().toArray();
            urlList.forEach((value, index, array) => {
                screenShot(value);
            });
        });
};

main();