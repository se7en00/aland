export default (state = {loading: false}, action) => {
    switch (action.type) {
    case 'LOAD_LOADING': {
        return Object.assign({}, state, {
            loading: action.loading
        });
    }
    default: {
        return state;
    }
    }
};
