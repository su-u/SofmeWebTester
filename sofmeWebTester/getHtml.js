const listFiles = require('./file').listFiles;
const Enumerable = require('linq');


const fileList = listFiles('G:\\マイドライブ\\file\\GitHub\\SofmeWeb');

const htmlList = Enumerable.from(fileList)
    .where(x => new RegExp('.*\.html').test(x))
    .select(x => x.replace('G:\\マイドライブ\\file\\GitHub\\SofmeWeb', ''))
    .toArray();
console.log(htmlList);

