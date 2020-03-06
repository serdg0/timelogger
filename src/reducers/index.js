import { combineReducers } from 'redux';
import ProjectsReducer from './projects';
import loginReducer from './login';
import tokenReducer from './token';

const RESET = 'RESET';

const appReducer = combineReducers({
  projects: ProjectsReducer,
  logged: loginReducer,
  token: tokenReducer,
});

const rootReducer = (state, action) => {
  if (action.type === RESET) {
    state = undefined; // eslint-disable-line
  }

  return appReducer(state, action);
};

export default rootReducer;
