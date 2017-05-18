import request from 'request-promise';
import md5 from 'blueimp-md5';
import randomNumber from './randomNumber.js'
import bijection from 'bijective-shortener';

module.exports = {
    /**
     * 
     * Get Short URL IF 
     *  - There's not an existing Short url present
     * 
     * Input:
     *  url: sanitized url string
     *  config: Server configuration, see config.json
     *  res: API response object
     * 
     * Output:
     *  ShortURL
     */
    getShortUrl: function (url, config, res) {
        let urlHash = md5(url); // hash url to make matching easier, collision is highly unlikely
        let baseUrl = config.baseUrl + ":" + config.port + "/";

        //Match existing url's via md5 hash
        request.get({
                url: baseUrl + "db/url/?md5=" + urlHash,
                rejectUnauthorized: false 
            })
            .then(function (response) {
                if (response.length == 2) {
                    //There's no match, store our new url and shortUrl to the database
                    let id = randomNumber.get();
                    let short = bijection.makeFromInteger(id);
                 
                    var options = {
                        method: 'POST',
                        uri: baseUrl + "db/url/",
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
                    // We already have a url generated, return it.
                    let parsed = JSON.parse(response);
                    return res.status(200).json({
                        message: 'URL already exists: ' + parsed[0].shortUrl
                    });
                }
            });
    }
}