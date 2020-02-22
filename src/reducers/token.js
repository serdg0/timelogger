const SET = 'SET';

const tokenReducer = (state = '', action) => {
    const token = action.token;
    switch(action.type) {
        case SET:
            return token;
        default:
            return state
    }
}

export default tokenReducer;