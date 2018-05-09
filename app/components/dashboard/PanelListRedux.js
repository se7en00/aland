const initialState = {
    loading: true,
    error: false,
    panelList: []
};

const LOAD_PANELS = 'LOAD_PANELS';
const LOAD_PANELS_SUCCESS = 'LOAD_PANELS_SUCCESS';
const LOAD_PANELS_ERROR = 'LOAD_PANELS_ERROR';

//actions creater
export const loadPanels = () => ({
    types: [LOAD_PANELS, LOAD_PANELS_SUCCESS, LOAD_PANELS_ERROR],
    url: '/api/user/list'
});

export const actions = {
    loadPanels
};

//reducer
const panelList = (state = initialState, action) => {
    switch (action.type) {
    case LOAD_PANELS: {
        return {
            ...state,
            loading: true,
            error: false
        };
    }

    case LOAD_PANELS_SUCCESS: {
        return {
            ...state,
            loading: false,
            error: false,
            panelList: action.payload
        };
    }

    case LOAD_PANELS_ERROR: {
        return {
            ...state,
            loading: true,
            error: true
        };
    }

    default:
        return state;
    }
};

export default panelList;
