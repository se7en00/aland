import typeToReducer from 'type-to-reducer';
import * as TYPES from './examsActionType';

//reducer
const examsReducer = typeToReducer({
    //列表
    [TYPES.ASYNC_LOAD_EXAM_LIST]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            list: action.payload
        })
    },
    //搜索
    [TYPES.SYNC_EXAM_LIST_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    }),

    [TYPES.ASYNC_DELETE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_LOAD_CATEGORIES]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            categoryList: action.payload
        })
    },

    [TYPES.ASYNC_CREATE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_UPDATE_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_LOAD_EDIT_EXAM]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            editExam: action.payload
        })
    },

    [TYPES.SYNC_RESET_EDIT_EXAM]: (state, action) => {
        if (Object.hasOwnProperty.call(state, 'editExam')) {
            delete state.editExam;
        }
        return {...state};
    }
}, {});

export default examsReducer;
