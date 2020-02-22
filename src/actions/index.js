const LOGIN = 'LOGIN';

const loginAction = status => ({
    type: LOGIN,
    status,
})

export { loginAction };