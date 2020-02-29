const ADD = 'ADD';
const REMOVE = 'REMOVE';
const RETRIEVE = 'RETRIEVE';
const ADDCLOCK = 'ADDCLOCK';
const RESET = 'RESET';

const ProjectsReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [...state, action.project];
    case REMOVE:
      return state.filter(proj => proj !== action.project);
    case RETRIEVE:
      return [...state, ...action.projects];
    case ADDCLOCK:
      return state.map(project => {
        if (Object.is(project.id, action.clock.id)) {
          return {
            ...project,
            items: [...project.items, action.clock],
          };
        }
        return project;
      });
    default:
      return state;
  }
};

export default ProjectsReducer;