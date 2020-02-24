const LOGIN = 'LOGIN';
const SET = 'SET';
const ADD = 'ADD';
const REMOVE = 'REMOVE';

const loginAction = status => ({
    type: LOGIN,
    status,
})

const setAuthAction = token => ({
    type: SET,
    token
})

const addProjectAction = project => ({
    type: ADD,
    project,
})

const removeProjectAction = project => ({
    type: REMOVE,
    project,
})

export { loginAction, setAuthAction, addProjectAction, removeProjectAction };