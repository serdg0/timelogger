import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
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
    const { title } = this.state;
    axios.post('https://cors-anywhere.herokuapp.com/https://hidden-ocean-49877.herokuapp.com/todos', null, { params: { title }, headers: { Authorization: token } })
      .then(response => {
        add(response.data);
        this.setState({
          title: '',
        });
      }).catch(() => false);
  }

  render() {
    const { title } = this.state;
    return (
      <form>
        <div className="form-group">
          <label className="header" htmlFor="addProject">
            New Project
            <input id="addProject" className="form-control" value={title} onChange={this.changeHandler} name="title" placeholder="Project title" type="text" />
          </label>
        </div>
        <Link to="projects"><button onClick={this.handleClick} type="button" className="btn btn-color">Add Project</button></Link>
      </form>
    );
  }
}

ProjectForm.propTypes = {
  add: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default ProjectForm;
