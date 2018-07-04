import typeToReducer from 'type-to-reducer';
import * as TYPES from './materialsActionType';

//reducer
const materialsReducer = typeToReducer({
    //列表
    [TYPES.ASYNC_LOAD_MATERIALS_LIST]: {
        REJECTED: (state, action) => ({
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            list: action.payload
        })
    },
    //搜索
    [TYPES.SYNC_MATERIALS_LIST_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    }),

    [TYPES.ASYNC_DELETE_MATERIAL]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    }
}, {});

export default materialsReducer;
