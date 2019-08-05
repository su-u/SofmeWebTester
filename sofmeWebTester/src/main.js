const getUrlList = require('./UrlList').getUrlList;
const writer = require('./writeFile').writer;

const main = () => {
    getUrlList('http://softmedia.sakura.ne.jp/', 200)
        .then(value => {
            console.log(value.insideUrl);
            console.log(value.outsideUrl)
        });


};

main();