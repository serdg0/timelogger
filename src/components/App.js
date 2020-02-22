import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from '../reducers/index';
import ProjectList from '../containers/ProjectList';
import SigninForm from './Signin';
import { loginAction } from '../actions/index';


const App = props => {
  const { loginAction, logged } = props;
  return (
    <div>
      <SigninForm login={loginAction} />
      <ProjectList logged={logged} />
    </div>
  );
}

//          REDUX
const mapStateToProps = state =>({
  logged: state.logged,
  projects: state.projects,
})
const store = createStore(rootReducer, applyMiddleware(logger));
const Container = connect(mapStateToProps, {loginAction})(App);

const AppWrap = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  )
}

export default AppWrap;
