const client = require('cheerio-httpcli');
const URL     = require('url');
const Enumerable = require('linq');

const TARGET = 'http://softmedia.sakura.ne.jp/';
const MAX_COUNT = 200;

let targetList = [];
targetList.push(TARGET);

async function f() {
    for (let i = 0; i < targetList.length; i++) {
        if(i > MAX_COUNT)break;

        console.log(`fetch:${targetList[i]}`);
        const list = await client.fetch(targetList[i])
            .then((result) => {
                let _list = [];
                result.$('a').each(function (idx) {
                    let href = result.$(this).attr('href');
                    if (!href) return; //href属性を取得できない時の処理
                    // 絶対パスを相対パスに変更
                    href = URL.resolve(targetList[i], href);
                    href = href.replace(/\#.+$/, "");
                    if(!new RegExp('.+\.html').test(href)) return;
                    if(!new RegExp(TARGET).test(href)) return;
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
        targetList.push(...list);
        targetList = Enumerable.from(targetList).distinct().toArray();
        console.log(targetList);
        console.log(targetList.length)
    }
}

f();

