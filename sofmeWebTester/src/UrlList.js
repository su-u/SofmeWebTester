const client = require('cheerio-httpcli');
const URL     = require('url');
const Enumerable = require('linq');

const getUrlList = async (target, MAX_Count = 200) => {
    let outsideUrlList = [];
    let insideUtlList = [];
    let targetList = [];

    targetList.push(target);
    insideUtlList.push(target);

    const getUrl = async () => {
        for (let i = 0; i < targetList.length; i++) {
            if (i > MAX_Count) break;

            const UrlExtraction = (data) => {
                let _list = [];
                data.$('a').each(function (idx) {
                    let href = data.$(this).attr('href');
                    if (!href) return;

                    href = URL.resolve(targetList[i], href);
                    href = href.replace(new RegExp('#.+$'), "");
                    href = href.replace('#', "");
                    if (!new RegExp('.+\.html').test(href)) return;
                    if (!new RegExp(target).test(href)) {
                        outsideUrlList.push(href);
                        return;
                    }
                    _list.push(href);
                });
                return _list;
            };

            console.log(`${i} :fetch:${targetList[i]}`);

            try {
                const fetchData = await client.fetch(targetList[i]);
                const urlList = UrlExtraction(fetchData);
                insideUtlList.push(...urlList);
                targetList.push(...urlList);
                targetList = Enumerable.from(targetList).distinct().toArray();
            }catch (e) {
                console.log(e.stackTrace);
            }


        }
    };
    await getUrl();
    return {insideUrl:insideUtlList, outsideUrl:outsideUrlList};
};

module.exports.getUrlList = getUrlList;