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
    const dirname = 'img';
    fs.access(dirname, fs.constants.R_OK | fs.constants.W_OK, (error) => {
        if (error) {
            if (error.code === "ENOENT") {
                fs.mkdirSync(dirname);
            } else {
                return;
            }
        }
    });
    getUrlList('http://softmedia.sakura.ne.jp/', 1)
        .then(result => {
            console.log(result.insideUrl);
            console.log(result.outsideUrl);

            const uniqUrlList = Enumerable.from(result.insideUrl).distinct().toArray();

            screenShot(uniqUrlList, dirname).then(r => {
                console.log(uniqUrlList.length);
            });
        });
};


main();