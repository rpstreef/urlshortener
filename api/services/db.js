import request from 'request-promise';
import md5 from 'blueimp-md5';
import randomNumber from './randomNumber.js'
import bijection from 'bijective-shortener';

module.exports = {
    getShortUrl: function (url, config, res) {
        let urlHash = md5(url);
        let baseUrl = config.baseUrl + ":" + config.port + "/";

        request.get({
                url: "https://localhost:" + config.port + "/db/url/?md5=" + urlHash,
                rejectUnauthorized: false
            })
            .then(function (response) {
                if (response.length == 2) {
                    let id = randomNumber.get();
                    let short = bijection.makeFromInteger(id);
                 
                    var options = {
                        method: 'POST',
                        uri: "https://localhost:" + config.port + "/db/url/",
                        body: {
                            url: url,
                            shortUrl: baseUrl + short,
                            id: id,
                            md5: urlHash
                        },
                        rejectUnauthorized: false,
                        json: true // Automatically stringifies the body to JSON
                    };
                    request(options)
                        .then(function (parsedBody) {
                            let shorturl = baseUrl + short;
                            return res.status(200).json({
                                shortUrl: shorturl,
                                message: 'Short url generated: ' + shorturl
                            });
                        })
                        .catch(function (err) {
                            return res.status(500).json({
                                message: err
                            });
                        });
                } else {
                    let parsed = JSON.parse(response);
                    return res.status(200).json({
                        message: 'URL already exists: ' + parsed[0].shortUrl
                    });
                }
            });
    }
}