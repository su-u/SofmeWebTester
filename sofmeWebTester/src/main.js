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

const checkDir = (dir) =>{
    fs.access(dir, fs.constants.R_OK | fs.constants.W_OK, (error) => {
        if (error) {
            if (error.code === "ENOENT") {
                fs.mkdirSync(dir);
            } else {
                return;
            }
        }
    });
};


const main = () => {
    const insideDirname = 'img';
    const outsideDirname = 'out';

    checkDir(insideDirname);
    checkDir(outsideDirname);

    getUrlList('http://softmedia.sakura.ne.jp/', 1)
        .then(result => {
            console.log(result.insideUrl);
            console.log(result.outsideUrl);

            const uniqInsideUrlList = Enumerable.from(result.insideUrl).distinct().toArray();
            const uniqOutsideUrlList = Enumerable.from(result.outsideUrl).distinct().toArray();

            screenShot(uniqInsideUrlList, insideDirname).then(r => {
                console.log('----Finish inside url list.----');
            });
            screenShot(uniqOutsideUrlList, insideDirname).then(r => {
                console.log('----Finish outside url list.----');
            });
        });
};


main();