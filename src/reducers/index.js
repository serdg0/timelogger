import { combineReducers } from 'redux';
import ProjectsReducer from './projects';
import loginReducer from './login';

const rootReducer = combineReducers({
    projects: ProjectsReducer,
    logged: loginReducer,
})

export default rootReducer;