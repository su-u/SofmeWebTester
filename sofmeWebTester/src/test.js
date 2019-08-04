//Node.jsの日本語マニュアルを一気にローカルにダウンロードするプログラムです。

// モジュールの読込
const client  = require('cheerio-httpcli');
const URL     = require('url');
const writer = require('./writeFile').writer;

//共通の設定
//階層の指定
const LINK_LEVEL = 2;

//基準となるページURL
const TARGET_URL = "http://softmedia.sakura.ne.jp/";

let list       = {};


//指定のurlを最大レベルlevelまでダウンロードする
const downloadRec = (url, level) => {
    //最大レベルのチェックをする (最大レベルになるまでループさせるため)
    if (level >= LINK_LEVEL) return;

    //既出のサイトは虫をする。
    if (list[url]) return;

    list[url] = 1;
    //基準ページ以外なら無視をする
    //-----------------------------------------------------------
    const us  = TARGET_URL.split("/");
    us.pop();  //popメソッドを使用して、配列の最後の要素を削除します。

    const base = us.join("/");  //joinメソッドは配列の各要素を指定の文字列で連結し、結果の文字列を返します。

    if (url.indexOf(base) < 0 ) return;
    //console.log(url.indexOf(base));
    //-----------------------------------------------------------

    // HTMLを取得する
    client.fetch(url, {}, function( err, $, res){
        //リンクされているページを取得
        $("a").each(function(idx){
            //  タグのリンク先を得る
            let href = $(this).attr('href');

            if (!href) return; //href属性を取得できない時の処理

            // 絶対パスを相対パスに変更
            href = URL.resolve(url, href);

            //'#' 以降を無視する(a.html#aa と a.html#bb　は同じものとする)
            href = href.replace(/\#.+$/, "") //末尾の#を消す

            if(!new RegExp('.+\.html').test(href)) return;
            downloadRec(href, level + 1);
        });

        // ページを保存 (ファイル名を決定する)
        if ( url.substr(url.length - 1, 1) === '/'){
            url += "index.html"; //インデックスを自動追加する。
        }
        const savepath = url.split("/").slice(2).join("/"); //slice::配列の一部を取り出して新しい配列を返します。

        //保存先のディレクトリが存在するか確認をする。
        console.log(savepath); //nodejs.jp/nodejs.org_ja/docs/v0.10/download
        writer('urlList.txt', `http://${savepath}\r\n`)
        // fs.writeFileSync(savepath, $.html());

    });
};

downloadRec(TARGET_URL, 0);