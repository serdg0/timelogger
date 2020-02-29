import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';
import {ProjectList, ProjectsSwitch} from '../containers/ProjectList';
import SigninForm from '../containers/Signin';
import SignupForm from '../containers/Signup';
import ProjectForm from '../containers/ProjectForm';
import { loginAction, setAuthAction, addProjectAction, removeProjectAction, getProjectsAction, addClockToProject, resetAction } from '../actions/index';
import { Redirect, Route, Link, Switch } from 'react-router-dom';


const App = props => {
  const { token, projects, setAuthAction, loginAction, addProjectAction, removeProjectAction, getProjectsAction, addClockToProject, resetAction } = props;
  const displaySignup = token === '' ? <Link to="/signup">Sign Up</Link> : null;

  return (
    <div className='center'>
      <Redirect exact from="/" to='/signin' />
      <Switch>
        <Route path='/newproject' render={(routerProps) => <ProjectForm add={addProjectAction} token={token} {...routerProps} />} />
        <Route path='/signin' render={(routerProps) => <SigninForm token={token} login={loginAction} tokenize={setAuthAction} retrieve={getProjectsAction} {...routerProps} />} />
        <Route path='/projects' render={(routerProps) => <ProjectsSwitch reset={resetAction} retrieve={getProjectsAction} tokenize={setAuthAction} clock={addClockToProject} token={token} projects={projects} add={addProjectAction} remove={removeProjectAction} {...routerProps} />} />
        <Route path='/signup' render={(routerProps) => <SignupForm login={loginAction} tokenize={setAuthAction} {...routerProps} />} />
      </Switch>
      {displaySignup}
    </div>
  );
}

const mapStateToProps = state =>({
  logged: state.logged,
  projects: state.projects,
  token: state.token,
})
const store = createStore(rootReducer, applyMiddleware(logger));
const Container = connect(mapStateToProps, { loginAction,
  setAuthAction,
  addProjectAction,
  removeProjectAction,
  getProjectsAction, 
  addClockToProject,
  resetAction})(App);

const AppWrap = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export default AppWrap;
