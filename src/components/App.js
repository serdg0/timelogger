import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import {
  Redirect, Route, Switch,
} from 'react-router-dom';
import PropTypes from 'prop-types';
import rootReducer from '../reducers/index';
import { ProjectsSwitch } from '../containers/ProjectList';
import SigninForm from '../containers/Signin';
import SignupForm from '../containers/Signup';
import ProjectForm from '../containers/ProjectForm';
import {
  loginAction,
  setAuthAction,
  addProjectAction,
  removeProjectAction,
  getProjectsAction,
  addClockToProject,
  resetAction,
} from '../actions/index';

const App = props => {
  const {
    token,
    projects,
    setAuthAction,
    loginAction,
    addProjectAction,
    removeProjectAction,
    getProjectsAction,
    addClockToProject,
    resetAction,
  } = props;

  return (
    <div className="center">
      <Redirect exact from="/" to="/signin" />
      <Switch>
        <Route path="/newproject" render={() => <ProjectForm add={addProjectAction} token={token} />} />
        <Route path="/signin" render={() => <SigninForm token={token} login={loginAction} tokenize={setAuthAction} retrieve={getProjectsAction} />} />
        <Route path="/projects" render={({ match }) => <ProjectsSwitch reset={resetAction} retrieve={getProjectsAction} tokenize={setAuthAction} clock={addClockToProject} token={token} projects={projects} add={addProjectAction} remove={removeProjectAction} match={match} />} />
        <Route path="/signup" render={() => <SignupForm login={loginAction} tokenize={setAuthAction} token={token} />} />
      </Switch>
    </div>
  );
};

const mapStateToProps = state => ({
  logged: state.logged,
  projects: state.projects,
  token: state.token,
});
const store = createStore(rootReducer);
const Container = connect(mapStateToProps, {
  loginAction,
  setAuthAction,
  addProjectAction,
  removeProjectAction,
  getProjectsAction,
  addClockToProject,
  resetAction,
})(App);

const AppWrap = () => (
  <Provider store={store}>
    <Container />
  </Provider>
);

App.propTypes = {
  token: PropTypes.string.isRequired,
  projects: PropTypes.instanceOf(Array).isRequired,
  setAuthAction: PropTypes.func.isRequired,
  loginAction: PropTypes.func.isRequired,
  addProjectAction: PropTypes.func.isRequired,
  removeProjectAction: PropTypes.func.isRequired,
  getProjectsAction: PropTypes.func.isRequired,
  addClockToProject: PropTypes.func.isRequired,
  resetAction: PropTypes.func.isRequired,
};

export default AppWrap;
