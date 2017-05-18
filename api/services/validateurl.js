const reg = new RegExp("(https:[/][/]|http:[/][/]|www.)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$");

module.exports = {
    isURLValid: function (url) {
        console.log(url);
        return reg.test(url);
    }
}