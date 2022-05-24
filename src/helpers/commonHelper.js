const getTime = () => {
    let time = Math.round(new Date().getTime()/1000);
    return time;
}

module.exports = {
    getTime
}