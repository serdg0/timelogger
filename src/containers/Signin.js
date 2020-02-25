import React, { Component } from 'react';
import axios from 'axios';

class SigninForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
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
        axios.post('http://localhost:3001/auth/login', {withCredentials: true,
        email: email, password: password})
            .then(response => {
                const token = response.data.auth_token;
                login(true);
                tokenize(token);
                axios.get('http://localhost:3001/todos', { headers: {Authorization: token}})
                .then(projects => {
                    retrieve(projects.data);
                }).catch(error => console.log(error));
            }).catch(error => console.log(error));
    }

    render() {
        return (
            <form>
                <input onChange={this.changeHandler} name="email" type="email" placeholder="Email"></input>
                <input onChange={this.changeHandler} name="password" type="password" placeholder="Password"></input>
                <button onClick={this.loginHandler} type="button">Log In</button>
            </form>
        )
    }

}

export default SigninForm;