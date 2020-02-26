import React, { Component } from 'react';
import axios from 'axios';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: '',
        }
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
        const { name, email, password, passwordConfirmation } = this.state;
        const { login, tokenize } = this.props;
        axios.post('http://localhost:3001/signup', {withCredentials: true,
        name: name, email: email, password: password, password_confirmation: passwordConfirmation})
            .then(response => {
                login(true);
                tokenize(response.data.auth_token);
            }).catch(error => console.log(error));
    }

    render(){
        return(
            <form>
                <input onChange={this.handleChange} name="name"></input>
                <input onChange={this.handleChange} name="email" type="email"></input>
                <input onChange={this.handleChange} name="password" type="password"></input>
                <input onChange={this.handleChange} name="passwordConfirmation" type="password"></input>
                <button onClick={this.handleSubmit} type="button">Sign Up</button>
            </form>
        )
    }
}

export default SignupForm;