import React, { Component } from 'react';
import axios from 'axios';

class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    changeHandler(event) {
        const { target: { name, value } } = event;
        this.setState({
          [name]: value,
        });
    }

    handleClick() {
        const { add, token } = this.props;
        const { title } = this.state
        axios.post('http://localhost:3001/todos', null, { params: {title: title}, headers: {Authorization: token}})
        .then(response => {
          add(response.data)
          this.setState({
              title: '',
          })
        }).catch(error => console.log(error));
    }

    render() {
        
        return(
            <form>
                <input value={this.state.title} onChange={this.changeHandler} name="title" placeholder="Title" type="text"></input>
                <button onClick={this.handleClick} type="button">Add Project</button>
            </form>
        )
    }
}

export default ProjectForm;