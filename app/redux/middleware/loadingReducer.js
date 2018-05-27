export default (state = {isLoading: false}, action) => {
    switch (action.type) {
    case 'LOAD_LOADING': {
        return Object.assign({}, state, {
            isLoading: action.loading
        });
    }
    default: {
        return state;
    }
    }
};
