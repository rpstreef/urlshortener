'use strict';

var React = require('react');

module.exports = React.createClass({
  displayName: 'Layout',

  render: function render() {
    return (
      <html>
        <head>
          <meta charSet='utf-8' />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <title>URL Shortener</title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap-theme.min.css" />
          <link href="/flatly.css" rel="stylesheet" />
          <link href="/styles.css" rel="stylesheet" />
        </head>
        <body id="home">
          <div className="navbar navbar-default navbar-fixed-top">
            <div className="container">
              <div className="navbar-header">
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div className="page-header">
                <div className="col-lg-8">
                  <h1>Shorten</h1>
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
          <script src='/bundle.js'></script>
        </body>
      </html>
    );
  }
});