const re = (_string) =>{
    const string = _string;

    const s1 = string.replace(new RegExp('(http://)|(https://)'), '');
    const s = s1.split('/');
    const result = s.join('-');
    return result;
};

console.log(re('http://softmedia.sakura.ne.jp/multi/index.html'));