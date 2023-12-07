const formatNumber = (val, min, max) => {
    var num = Number(val);
    if(val < min) num = min;
    else if(val > max) num = max;

    return num;
}

const formatString = (val, maxLen) => {
    var str = String(val);
    if(str.length > maxLen) str = str.substring(0, maxLen);

    return str;
}

export { formatNumber, formatString }