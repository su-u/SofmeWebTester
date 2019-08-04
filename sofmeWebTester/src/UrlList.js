const client = require('cheerio-httpcli');
const URL     = require('url');

const TARGET = 'http://softmedia.sakura.ne.jp/';

let targetList = [];
targetList.push(TARGET);

targetList.forEach((value, index, array) =>{
    console.log(`fetch:${value}`);
    const promise = client.fetch(value)
        .then((result) => {
            let _list = [];
            result.$('a').each(function (idx) {
                let href = result.$(this).attr('href');
                if (!href) return; //href属性を取得できない時の処理
                // 絶対パスを相対パスに変更
                href = URL.resolve(TARGET, href);
                href = href.replace(/\#.+$/, "");
                if(!new RegExp('.+\.html').test(href)) return;
                _list.push(href);
            });
            return _list;
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            console.log('終了');
        });
    promise.then((value) =>{
        array.push(...value);
        console.log(value);
        console.log(array);
    });
    console.log(targetList.length)
});

