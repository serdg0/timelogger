import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    const {
      name, email, password, passwordConfirmation,
    } = this.state;
    const { login, tokenize } = this.props;
    axios.post('https://cors-anywhere.herokuapp.com/https://hidden-ocean-49877.herokuapp.com/signup', {
      name, email, password, password_confirmation: passwordConfirmation,
    })
      .then(response => {
        login(true);
        tokenize(response.data.auth_token);
      }).catch(() => false);
  }

  render() {
    const { token } = this.props;
    const renderProjs = token === '' ? null : <Redirect from="/signup" to="projects" />;
    return (
      <form className="center">
        <div className="form-group">
          <label htmlFor="name">
            Name
            <input id="name" className="form-control" placeholder="Enter name" onChange={this.handleChange} name="name" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input id="email" className="form-control" placeholder="Enter email" onChange={this.handleChange} name="email" type="email" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password">
            Password
            <input id="password" className="form-control" placeholder="Enter password" onChange={this.handleChange} name="password" type="password" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="passCon">
            Password Confirmation
            <input htmlFor="passCon" className="form-control" placeholder="Confirm password" onChange={this.handleChange} name="passwordConfirmation" type="password" />
          </label>
        </div>
        <button className="btn btn-color" onClick={this.handleSubmit} type="button">Sign Up</button>
        {renderProjs}
      </form>
    );
  }
}

SignupForm.propTypes = {
  token: PropTypes.string.isRequired,
  tokenize: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default SignupForm;
