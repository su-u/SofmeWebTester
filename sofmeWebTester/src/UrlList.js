const client = require('cheerio-httpcli');
const URL     = require('url');
const Enumerable = require('linq');

const TARGET = 'http://softmedia.sakura.ne.jp/';


const getUrlList = async (target, MAX_Count = 200) => {
    let targetList = [];
    targetList.push(TARGET);
    const getUrl = async () => {
        for (let i = 0; i < targetList.length; i++) {
            if (i > MAX_Count) break;

            console.log(`${i} :fetch:${targetList[i]}`);
            const fetchData = await client.fetch(targetList[i]);

            const UrlExtraction = (data) => {
                let _list = [];
                data.$('a').each(function (idx) {
                    let href = data.$(this).attr('href');
                    if (!href) return;

                    href = URL.resolve(targetList[i], href);
                    href = href.replace(/\#.+$/, "");
                    if (!new RegExp('.+\.html').test(href)) return;
                    if (!new RegExp(TARGET).test(href)) return;
                    _list.push(href);
                });
                return _list;
            };
            const urlList = UrlExtraction(fetchData);
            targetList.push(...urlList);
            targetList = Enumerable.from(targetList).distinct().toArray();
        }
    };
    await getUrl();
    return targetList;
};
getUrlList('http://softmedia.sakura.ne.jp/', 5)
    .then(value => {
        console.log(value);
});


