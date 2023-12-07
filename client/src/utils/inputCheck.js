const formatNumber = (val, min, max) => {
    var num = Number(val);
    if(val < min) num = min;
    else if(val > max) num = max;

    return num;
}

const formatString = (val, maxLen) => {
    var str = String(val);
    console.log(str);
    return str;
}

export { formatNumber, formatString }