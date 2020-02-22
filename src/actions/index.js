const LOGIN = 'LOGIN';
const SET = 'SET';

const loginAction = status => ({
    type: LOGIN,
    status,
})

const setAuthAction = token => ({
    type: SET,
    token
})

export { loginAction, setAuthAction };