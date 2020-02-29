import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
                <div className='form-group'>
                    <label className='header' for='addProject'>New Project</label>
                    <input id='addProject' className='form-control' value={this.state.title} onChange={this.changeHandler} name="title" placeholder="Project title" type="text"></input>
                </div>
                <Link to='projects'><button onClick={this.handleClick} type="button" className='btn btn-color'>Add Project</button></Link>
            </form>
        )
    }
}

export default ProjectForm;