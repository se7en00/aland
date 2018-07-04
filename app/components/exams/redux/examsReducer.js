import typeToReducer from 'type-to-reducer';
import * as TYPES from './examsActionType';

//reducer
const examsReducer = typeToReducer({
    //列表
    [TYPES.ASYNC_LOAD_EXAM_LIST]: {
        REJECTED: (state, action) => ({
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
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
    }
}, {});

export default examsReducer;
