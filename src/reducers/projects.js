const ADD = 'ADD';
const REMOVE = 'REMOVE';
const RETRIEVE = 'RETRIEVE';

const ProjectsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [...state, action.project]
        case REMOVE:
            return state.filter(proj => proj !== action.project)
        case RETRIEVE:
            return [...state, ...action.projects]
        default:
            return state;
    }
}

export default ProjectsReducer;