const reg = new RegExp("(https:[/][/]|http:[/][/]|www.)[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*$");

/**
 * 
 * Applies the regex to validate url's and "sanitize" form input field
 */
module.exports = {
    isURLValid: function (url) {
        return reg.test(url);
    }
}