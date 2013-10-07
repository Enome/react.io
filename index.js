/** @jsx React.DOM */

var _ = require('lodash');
var React = require('./react');
var socketMixin = require('./socket-mixin')('http://carl.local:3000');

var person = React.createClass({

  updateValue: function (e) {
    this.state.person.name = e.target.value;
    this.setState({ person: this.state.person });
    this.props.onChange(this.state.person);
  },

  componentWillReceiveProps: function (props) {
    this.setState({
      person: props.person 
    });
  },

  getInitialState: function () {
    return {
      person: this.props.person 
    };
  },

  render:  function () {
    return (
      <div>
        <h2>{this.state.name}</h2>
        <input type='text' onChange={this.updateValue} value={this.state.person.name}/>
      </div>
    );
  }

});

var people = React.createClass({

  mixins: [socketMixin],

  updateValue: function (e) {
    this.setState({ name: e.target.value });
  },

  add: function () {
    this.state.people.push({ name: this.state.name });
    this.setState({ people: this.state.people, name: '' });
  },

  remove: function (person) {
    this.state.people.splice(this.state.people.indexOf(person), 1) 
    this.setState({ people: this.state.people });
  },

  change: function (person) {
    this.setState(this.state);
  },

  getInitialState: function () {
    return {
      people: [{ id: 0, name: 'Jimi' }, { id: 1, name: 'Stevie' }, { id: 2, name: 'eric' } ],
      name: ''
    }; 
  },

  render: function () {

    var list = this.state.people.map(function (data) {
      return (
        <li>
          <person person={data} onChange={this.change}></person>
          <button onClick={this.remove.bind(this, data)}>Remove</button>
        </li>
      );
    }.bind(this));

    return (
      <div>
        <ul>{list}</ul>
        <input type='text' onChange={this.updateValue} value={this.state.name}/>
        <button onClick={this.add}>Add</button>
      </div>
    )  
  }

});

document.addEventListener('DOMContentLoaded', function () {
  React.renderComponent(<people></people>, document.getElementById('content'));
});
