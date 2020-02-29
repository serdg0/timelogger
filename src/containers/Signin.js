import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

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
        const { token } = this.props;
        const renderProjs = token === '' ? null : <Redirect from='/signin' to='projects' />;
        return (
            <form className='center'>
                <div className='form-group'>
                    <label for='signMail'>Email</label>
                    <input id='signMail' className='form-control' onChange={this.changeHandler} name="email" type="email" placeholder="Enter email"></input>
                </div>
                <div className='form-group'>
                    <label for='signPass'>Password</label>
                    <input id='signPass' className='form-control' onChange={this.changeHandler} name="password" type="password" placeholder="Password"></input>
                </div>
                <button onClick={this.loginHandler} type="button" className='btn btn-color'>Log In</button> 
                {renderProjs}
            </form>
        )
    }

}

export default SigninForm;