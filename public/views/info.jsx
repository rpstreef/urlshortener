
'use strict';

var React = require('react');
/**
 * Show info box when we have an API call message
 */
module.exports = React.createClass({
  render: function render() {
    return (
     <div>
        <span className="label label-primary"> {this.props.message}</span>
    </div>
    );
  }
});