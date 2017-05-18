'use strict';

var React = require('react');
var Info = require('./info.jsx');

module.exports = React.createClass({
    displayName: 'Shorten it!',
    errors: '',
  
    getInitialState: function () {
        return { form: { url: '' } }
    },

    handleSubmit: function (event) {
        event.preventDefault();
        this.setState({message: this.sendFormData() });
    },
    onChange: function(event) {
        this.state.form[event.target.name] = event.target.value;

        this.setState({form: this.state.form});
    },

    sendFormData: function () {
        let formData = this.state.form;
        let message = this.state.message;
        fetch('/api/shorten', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => {
            resp.json().then((data) => {
                this.setState({message: data.message});
            });
        })
        .catch((error) => {
            error.json().then((data) => {
                this.setState({message: data.message});
            });
        });
        
    },

    render: function render() {
        return (
            <div>
                { this.state.message ? <Info message={this.state.message} /> : null }
                 
                <form action="" onSubmit={this.handleSubmit} className="bs-component">
                    <div className="form-group">
                            <input className="form-control" name="url" ref="url" required type="text" value={this.state.form.url} onChange={this.onChange}/>
                            <br/>
                            <button className="btn btn-default" type="submit">Shorten</button>
                    </div>
                </form>
            </div>
        );
    }
});