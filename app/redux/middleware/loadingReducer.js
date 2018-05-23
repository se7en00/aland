export default (state, action) => {
    switch (action.type) {
    case 'LOAD_LOADING': {
        return action.loading;
    }
    default: {
        return false;
    }
    }
};
