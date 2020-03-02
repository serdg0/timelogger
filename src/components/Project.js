import React from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Clock from './Clock';
import TimeList from '../containers/TimeList';

const Project = props => {
  const {
    match, remove, token, clock, projects,
  } = props;
  const project = projects.find(({ id }) => id.toString() === match.params.projectId);
  const {
    id, title, created_at: createdAt, items,
  } = project;
  const creation = format(new Date(createdAt), 'PPPP');

  const handleDelete = () => {
    axios.delete(`https://hidden-ocean-49877.herokuapp.com/todos/${id}`, { data: { id }, headers: { Authorization: token } })
      .then(() => {
        remove(project);
      }).catch(() => false);
  };

  return (
    <div>
      <div>
        <h3 className="header">
          {title}
        </h3>
      </div>
      <small>
        created:
        {creation}
      </small>
      <div>
        <Clock clock={clock} id={id} token={token} />
      </div>
      <div>
        <TimeList items={items} />
      </div>
      <Link to="/projects">Back</Link>
      {' '}
      <button className="btn btn-link" onClick={() => handleDelete()} type="button"><Link to="/projects">Remove</Link></button>

    </div>

  );
};

Project.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  remove: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  clock: PropTypes.func.isRequired,
  projects: PropTypes.instanceOf(Array).isRequired,
};

export default Project;
