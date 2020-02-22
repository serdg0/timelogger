import { combineReducers } from 'redux';
import ProjectsReducer from './projects';
import loginReducer from './login';
import tokenReducer from './token';

const rootReducer = combineReducers({
    projects: ProjectsReducer,
    logged: loginReducer,
    token: tokenReducer,
})

export default rootReducer;