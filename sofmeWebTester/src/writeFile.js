const fs = require('fs');

//ファイルの書き込み関数
const writeFile = (path, data) => {
    fs.appendFile(path, data, function (err) {
        if (err) {
            throw err;
        }
    });
};

module.exports.writer = writeFile;