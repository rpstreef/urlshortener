### Code structure
- API
    - server side code
- Services
    - Database
        - Can be served and scaled on separate database
    - Validation library
        - Can be served and scaled on separate database
    - Random numbers for database entry
        - If there are many URL's generated, collision is likely(!)
        
- Public
    - Anything that is served on the client. 
        - React layouts, routes, static (if any), css, and index files
- Root
    - Server initialization files and certificates for SSL, HTTPS
    - Configuration files for development, webpack, npm packager.



### Security issues
    - SQL Injection
        - Unsecure API's, no authentication
 
## Scalability issues
    - Database writes

    - Database reads

    - Parsing URLS

    - Serving site

## Sources

### URL regex
https://mathiasbynens.be/demo/url-regex

### Exploits

- SQL Injection
    - https://www.exploit-db.com/exploits/17937/

### Find regex for url pattern matching
- http://regexlib.com/Search.aspx?k=url&c=-1&m=5&ps=20

### URL shortener
- via bijection
    - https://en.wikipedia.org/wiki/Bijection
    - http://phpden.info/How-to-Build-a-URL-Shortner-like-bit.ly-or-goo.gl
    - http://stackoverflow.com/questions/742013/how-to-code-a-url-shortener
    - http://blog.gainlo.co/index.php/2016/03/08/system-design-interview-question-create-tinyurl-system/?utm_campaign=quora&utm_medium=What+are+the+http%3A%2F%2Fbit.ly+and+t.co+shortening+algorithms%3F&utm_source=quora

### ExpressJS best practices
- https://expressjs.com/en/advanced/best-practice-performance.html#in-code

### Error handling
- http://expressjs.com/en/guide/error-handling.html

### SSL and Express 4
- http://blog.ayanray.com/2015/06/adding-https-ssl-to-express-4-x-applications/
