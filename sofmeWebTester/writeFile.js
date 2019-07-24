var fs = require('fs');

//ファイルの書き込み関数
function writeFile(path, data) {
    fs.writeFileSync(path, data, function (err) {
        if (err) {
            throw err;
        }
    });
}

//使用例
writeFile("test.txt", ["aaa","bbb"]);