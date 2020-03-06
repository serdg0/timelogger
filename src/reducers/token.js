const SET = 'SET';

const tokenReducer = (state = '', action) => {
  const { token } = action;
  switch (action.type) {
    case SET:
      return token;
    default:
      return state;
  }
};

export default tokenReducer;
