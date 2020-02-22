import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';
import ProjectList from '../containers/ProjectList';
import SigninForm from './Signin';
import { loginAction, setAuthAction } from '../actions/index';


const App = props => {
  const { loginAction, logged, setAuthAction } = props;
  return (
    <div>
      <SigninForm login={loginAction} tokenize={setAuthAction} />
      <ProjectList logged={logged} />
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
const Container = connect(mapStateToProps, {loginAction, setAuthAction})(App);

const AppWrap = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export default AppWrap;
