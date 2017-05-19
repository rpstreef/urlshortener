# URL Shortener

## Install instructions
Everything runs locally, there's no database to install since it uses json-server to host the database from a json file.

npm start will run the development environment with nodemon, compile with babel and start the express server backend.

```
git clone https://github.com/rpstreef/urlshortener.git
npm install
npm start
```

## Code structure
- API
    - Services
        - Database
            - Checks existing ShortURL entries, if not present writes new shortURL entry.
        - Validation URL library
            - Check via regex if URL entered via input field conforms to URL format.
        - Random numbers for database entry
            - Generates a random number, used for generating the shorturl and as ID in the database for that ShortURL entry.
            - Note: If there are many URL's generated, collision is likely(!)
- Public, files served on the client-side.
    - css
        - style sheets
    - views
        - React layouts, routes and react partial view implementations.
    - bundle.js, generated javascript from Babel compilation.
- Root
    - Server initialization files and certificates for SSL, HTTPS
    - Configuration files for development, webpack, npm packager, eslint.

## Security issues
    Security issues with this solution:
    - SQL Injection
        - Unprotect database REST api's can be vulnerable to scripting atacks deleting/aletering the database content.
        - Solution:
            - Only allow server ip/subnet to execute on the database and put the database in a subnet not accessible to the internet.
    - Brute force shortened URL's:
        - In this case of OneDrive, if the end user does not enforce strict sharing rules, their files are out in the open.
        - http://www.pcmag.com/news/343781/url-shorteners-convenient-but-a-potential-security-risk
        - Solution:
            - Create longer URL's that are much harder to bruteforce, ultimately it's a battle that can't be won. Plus, shortened URL's will loose their purpose if they're too long.
    - Mallware
        - I can shorten a url, hide mallware behind it that will auto-download and execute
        - Solution:
            - Implement a URL scanning solution to verify integrity of the URL and it's contents. Hard to implement and hard to verify. Contents can be altered after URL shortening process has been completed.
    - Not secured REST API's
        - REST API's for URL shortening is open to the world for access.
        - Solution: use API keys to secure access to private Rest endpoints. Only the application with access to the API secret key can execute on the endpoint.
            - https://stormpath.com/blog/express-sample-api-key-management

## Scalability issues
    - Database writes
        - Once more users use the service, writes will increase.
        - Solution:
            - Scale vertically, increase the size of the machine running your database.
            - Scale horizontal, increase the number of database instances that can write data. Requires master-master setup for your database solution. MySQL, Oracle, NoSQL (OrientDB, ArangoDB)
    - Database reads
        - For every shorturl entry into the database, there's a read action to confirm there's no duplicate. It's a simple key - value based search. Either NoSQL or Relational database would be suitable.
        - Solution:
            - Scale vertically, increase the size of the database instance.
            - Scale horizontal, increase the number of database "slaves" to scale out read capacity.
    - Parsing URLS
        - Conversion of a number to a shortURL.
        - Requires quite a lot conversions to put load on the hosting machine(!).
        - Solution:
            - Host conversion on a separate EC2 instance, load-balanced.
            - OR host on Serverless infrastructure like AWS Lambda which can scale automatically according to load.
    - Serving website
        - There's very little in the way of server processing done, again this requires quite high numbers of traffic.
        - Solution:
            - Combination of static file serving via a service like Amazon S3 and dynamic on a load balanced EC2 instance.
            - AWS CloudFront for localized caching and taking load off your EC2 instance. It can cache dynamic content with TTL=0.

    - General architecture:
        - This solution is all hosted on one machine and a client side for the fronted.
        - Solution:
            - Host services such as database; bijection algorithm from separate instances. 
            - Let the page serving instance call the services via rest endpoints.
            - Database can be installed on a dedicated instance.
            - Conversion algorithm can be served from a Serverless function.
            - Web tier, static on S3, dynamic on EC2 load-balanced and served via CloudFront with caching.
            
## Sources

### URL shortener
- Theory, Wiki bijection
    - https://en.wikipedia.org/wiki/Bijection
- How To:
    - http://phpden.info/How-to-Build-a-URL-Shortner-like-bit.ly-or-goo.gl
    - http://stackoverflow.com/questions/742013/how-to-code-a-url-shortener
    - http://blog.gainlo.co/index.php/2016/03/08/system-design-interview-question-create-tinyurl-system/?utm_campaign=quora&utm_medium=What+are+the+http%3A%2F%2Fbit.ly+and+t.co+shortening+algorithms%3F&utm_source=quora

### Promise based libraries
- Fetch
    - https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
- Request, request promise
    - https://github.com/request/request-promise

### ExpressJS best practices
- Express 4 API documentation:
    - https://expressjs.com/en/4x/api.html#router
- Best practices
    - https://expressjs.com/en/advanced/best-practice-performance.html#in-code
- Error handling
    - http://expressjs.com/en/guide/error-handling.html
- Setting up SSL
    - http://blog.ayanray.com/2015/06/adding-https-ssl-to-express-4-x-applications/

### Frontend, React
- React Engine:
    - https://github.com/paypal/react-engine/
### Various
- URL Regex
    - https://mathiasbynens.be/demo/url-regex
