const listFiles = require('./file').listFiles;
const Enumerable = require('linq');


const webPath = 'G:\\マイドライブ\\file\\GitHub\\SofmeWeb';
const fileList = listFiles(webPath);

const htmlList = Enumerable.from(fileList)
    .where(x => new RegExp('.*\.html').test(x))
    .select(x => x.replace(webPath, ''))
    .toArray();
console.log(htmlList);

