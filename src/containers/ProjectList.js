import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import Project from '../components/Project';
import Total from './TotalsTracker';

const ProjectList = props => {
  const {
    projects, match, reset,
  } = props;
  const display = projects.map(proj => (
    <div key={proj.id} className="card">
      <Link to={`${match.url}/${proj.id}`}>
        <div className="card-body header">
          {proj.title}
        </div>
      </Link>
    </div>
  ));
  const logout = () => reset();
  return (
    <div className="center">

      <Link to="signin"><button type="button" className="btn btn-link blue" onClick={() => logout()}>Log Out</button></Link>
      <h3 className="header">Projects</h3>
      <small><Total projects={projects} /></small>
      <Link to="newproject">New Project</Link>
      <div>
        {display}
      </div>
    </div>
  );
};

const ProjectsSwitch = props => {
  const {
    clock, token, projects, add, remove, reset,
  } = props;
  return (
    <Switch>
      <Route exact path="/projects" render={({ match }) => <ProjectList reset={reset} clock={clock} token={token} projects={projects} add={add} remove={remove} match={match} />} />
      <Route path="/projects/:projectId" render={({ match }) => <Project projects={projects} clock={clock} token={token} remove={remove} match={match} />} />
    </Switch>
  );
};

ProjectList.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  projects: PropTypes.instanceOf(Array).isRequired,
  reset: PropTypes.func.isRequired,
};

ProjectsSwitch.propTypes = {
  clock: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  projects: PropTypes.instanceOf(Array).isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

export { ProjectList, ProjectsSwitch };
