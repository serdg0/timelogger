const LOGIN = 'LOGIN';

const loginReducer = (state = false, action) => {
    const status = action.status;
    switch(action.type) {
        case LOGIN:
            return status;
        default:
            return state
    }
}

export default loginReducer;