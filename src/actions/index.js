const LOGIN = 'LOGIN';
const SET = 'SET';
const ADD = 'ADD';
const REMOVE = 'REMOVE';
const RETRIEVE = 'RETRIEVE';
const ADDCLOCK = 'ADDCLOCK';

const loginAction = status => ({
  type: LOGIN,
  status,
});

const setAuthAction = token => ({
  type: SET,
  token,
});

const addProjectAction = project => ({
  type: ADD,
  project,
});

const removeProjectAction = project => ({
  type: REMOVE,
  project,
});

const getProjectsAction = projects => ({
  type: RETRIEVE,
  projects,
});

const addClockToProject = clock => ({
  type: ADDCLOCK,
  clock,
});

export {
  loginAction, setAuthAction, addProjectAction, removeProjectAction, getProjectsAction, addClockToProject,
};