import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';
import ProjectList from '../containers/ProjectList';
import SigninForm from '../containers/Signin';
import SignupForm from '../containers/Signup';
import { loginAction, setAuthAction, addProjectAction, removeProjectAction } from '../actions/index';


const App = props => {
  const { token, logged, projects, setAuthAction, loginAction, addProjectAction, removeProjectAction } = props;
  return (
    <div>
      <SigninForm login={loginAction} tokenize={setAuthAction} />
      <SignupForm login={loginAction} tokenize={setAuthAction} />
      <ProjectList logged={logged} token={token} projects={projects} />
    </div>
  );
}

//          REDUX
const mapStateToProps = state =>({
  logged: state.logged,
  projects: state.projects,
  token: state.token,
})
const store = createStore(rootReducer, applyMiddleware(logger));
const Container = connect(mapStateToProps, {loginAction, setAuthAction, addProjectAction, removeProjectAction})(App);

const AppWrap = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export default AppWrap;
