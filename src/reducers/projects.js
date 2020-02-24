const ADD = 'ADD';
const REMOVE = 'REMOVE';

const ProjectsReducer = (state = [], action) => {
    switch (action.type) {
        case ADD:
            return [...state, action.project]
        case REMOVE:
            return state.filter(proj => proj !== action.project)
        default:
            return state;
    }
}

export default ProjectsReducer;