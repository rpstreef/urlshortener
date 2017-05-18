
'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function render() {
    return (
     <div>
        <span className="label label-primary"> {this.props.message}</span>
    </div>
    );
  }
});