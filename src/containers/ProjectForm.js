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

  boolHandler(event) {
    const { target: { name, value } } = event;
    this.setState({
      [name]: !value,
    })
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
            <label className="header" htmlFor="title" value="Title:" />
            <input id="title" name="title" className="form-control" value={title} onChange={this.changeHandler} placeholder="Project title" type="text" />
            <label className="header" htmlFor="isPaid" value="Is it a paid project?" />
            <input id="isPaid" name="isPaid" className="form-control" value={isPaid} onChange={this.boolHandler} type="checkbox" />
            <label className="header" htmlFor="moneyPerHour" value="USD/hour rate:" />
            <input id="moneyPerHour" name="moneyPerHour" className="form-control" value={moneyPerHour} onChange={this.changeHandler} type="number" />
            <label className="header" htmlFor="deadline" value="Deadline:" />
            <input id="deadline" name="deadline" className="form-control" value={deadline} onChange={this.changeHandler} type="date" />
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
