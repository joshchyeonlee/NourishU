const formatNumber = (val, min, max) => {
    var num = Number(val);
    if(val < min) num = min;
    else if(val > max) num = max;

    return num;
}

const formatString = (val, maxLen) => {
    var str = String(val);
    if(str.length > maxLen) str = str.substring(0, maxLen);

    //https://stackoverflow.com/questions/41517216/safe-way-to-replace-strings-in-html-with-pure-javascript
    str.replace(/</g, '&lt;').replace(/>/g, '&gt;');

    return str;
}

export { formatNumber, formatString }