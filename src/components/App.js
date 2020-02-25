import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import rootReducer from '../reducers/index';
import ProjectList from '../containers/ProjectList';
import SigninForm from '../containers/Signin';
import SignupForm from '../containers/Signup';
import ProjectForm from '../containers/ProjectForm';
import { loginAction, setAuthAction, addProjectAction, removeProjectAction, getProjectsAction } from '../actions/index';


const App = props => {
  const { token, logged, projects, setAuthAction, loginAction, addProjectAction, removeProjectAction, getProjectsAction } = props;
  return (
    <Router>
    <div>
      <SigninForm login={loginAction} tokenize={setAuthAction} retrieve={getProjectsAction} />
      <Link to="/signup">Sign Up</Link>
      <ProjectForm add={addProjectAction} token={token} />
      <ProjectList token={token} projects={projects} remove={removeProjectAction} />

      <Switch>
        <Route path="/signup">
          <SignupForm login={loginAction} tokenize={setAuthAction} />
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

//          REDUX
const mapStateToProps = state =>({
  logged: state.logged,
  projects: state.projects,
  token: state.token,
})
const store = createStore(rootReducer, applyMiddleware(logger));
const Container = connect(mapStateToProps, {loginAction, setAuthAction, addProjectAction, removeProjectAction, getProjectsAction})(App);

const AppWrap = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export default AppWrap;
