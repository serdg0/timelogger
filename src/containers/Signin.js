import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SigninForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
  }

  changeHandler(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
  }

  loginHandler() {
    const { email, password } = this.state;
    const { login, tokenize, retrieve } = this.props;
    axios.post('https://cors-anywhere.herokuapp.com/https://hidden-ocean-49877.herokuapp.com/auth/login', {
      withCredentials: true,
      email,
      password,
    })
      .then(response => {
        const token = response.data.auth_token;
        login(true);
        tokenize(token);
        axios.get('https://cors-anywhere.herokuapp.com/https://hidden-ocean-49877.herokuapp.com/todos', { headers: { Authorization: token } })
          .then(projects => {
            retrieve(projects.data);
          }).catch(() => false);
      }).catch(() => false);
  }

  render() {
    const { token } = this.props;
    const renderProjs = token === '' ? null : <Redirect from="/signin" to="projects" />;
    return (
      <form className="center">
        <div className="form-group">
          <label htmlFor="signMail">
            Email
            <input id="signMail" className="form-control" onChange={this.changeHandler} name="email" type="email" placeholder="Enter email" />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="signPass">
            Password
            <input id="signPass" className="form-control" onChange={this.changeHandler} name="password" type="password" placeholder="Password" />
          </label>
        </div>
        <button onClick={this.loginHandler} type="button" className="btn btn-color">Log In</button>
        <Link to="/signup">Sign Up</Link>
        {renderProjs}
      </form>
    );
  }
}

SigninForm.propTypes = {
  login: PropTypes.func.isRequired,
  tokenize: PropTypes.func.isRequired,
  retrieve: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default SigninForm;
