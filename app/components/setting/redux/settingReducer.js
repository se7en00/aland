import typeToReducer from 'type-to-reducer';
import * as TYPES from './settingActionTypes';

//reducer
const settingReducer = typeToReducer({
    //用户列表
    [TYPES.ASYNC_LOAD_LIST]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            list: action.payload
        })
    },

    [TYPES.ASYNC_CREATE_SECRET_LEVEL]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_EDIT_SECRET_LEVEL]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_DELETE_TYPE]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_DIC_TYPE_DETAILS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            typeDetails: action.payload
        })
    },

    [TYPES.ASYNC_CREATE_SLIDERS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state) => ({
            ...state
        })
    },

    [TYPES.ASYNC_GET_SLIDERS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            sliders: action.payload
        })
    },

    [TYPES.SYNC_RESET_SLIDERS]: (state, action) => ({
        ...state,
        sliders: action.payload
    })
}, {});


export default settingReducer;
