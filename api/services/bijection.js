const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"; //Base 58
const base = 58;
/**
 * 
 * Can in some cases produce a shorturl that converts to a different ID number,
 * so no reliable, use 'bijective-shortener' package
 */
module.exports = {
    encode: function (dbId) {
        var encoded = '';
        while (dbId){
            var remainder = dbId % base;
            dbId = Math.floor(dbId / base);
            encoded = alphabet[remainder].toString() + encoded;
        }
        return encoded;
    },
    decode: function (qstring) {
        var decoded = 0;
        while (qstring){
            var index = alphabet.indexOf(qstring[0]);
            var power = qstring.length - 1;
            decoded += index * (Math.pow(base, power));
            qstring = qstring.substring(1);
        }
        return decoded;
    }
}