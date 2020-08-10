import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const initState = {
  title: '',
  moneyPerHour: null,
  deadline: null,
  isPaid: false
};

class ProjectForm extends Component {
  constructor(props) {
    super(props);
    this.state = initState
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
    const { title, moneyPerHour, deadline, isPaid } = this.state;
    axios.post('https://hidden-ocean-49877.herokuapp.com/todos', null, { params: { title, moneyPerHour, deadline, isPaid }, headers: { Authorization: token } })
      .then(response => {
        add(response.data);
        this.setState(initState);
      }).catch(e => console.log(e));
  }

  render() {
    const { title, moneyPerHour, deadline, isPaid } = this.state;
    return (
      <form>
        <div className="form-group">
          <label className="header" htmlFor="addProject">
            New Project
            <input id="addProject" className="form-control" value={title} onChange={this.changeHandler} name="title" placeholder="Project title" type="text" />
            <input id="addProject" className="form-control" value={moneyPerHour} onChange={this.changeHandler} name="moneyPerHour" type="number" />
            <input id="addProject" className="form-control" value={isPaid} onChange={this.changeHandler} name="isPaid" placeholder="Project title" type="checkbox" />
            <input id="addProject" className="form-control" value={deadline} onChange={this.changeHandler} name="deadline" placeholder="Project title" type="date" />
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
