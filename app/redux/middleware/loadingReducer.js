export default (state = {loading: false}, action) => {
    switch (action.type) {
    case 'LOADING': {
        return Object.assign({}, state, {
            loading: action.loading
        });
    }
    default: {
        return state;
    }
    }
};
