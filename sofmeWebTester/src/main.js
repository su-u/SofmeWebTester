const client = require('cheerio-httpcli');

client.fetch('http://softmedia.sakura.ne.jp/index.html')
    .then((result) => {
        result.$('a').each(function (idx) {
            console.log(result.$(this).attr('href'));
        });
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        console.log('終了');
    });