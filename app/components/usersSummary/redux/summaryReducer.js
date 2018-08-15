import typeToReducer from 'type-to-reducer';
import * as TYPES from './summaryActionTypes';

const tSummaryReducer = typeToReducer({
    [TYPES.ASYNC_LOAD_TRAINING_TASK_SUMMARY_LIST]: {
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
    [TYPES.SYNC_SUMMARY_LIST_SEARCH_PARAMS]: (state, action) => ({
        ...state,
        searchParams: action.payload
    })

}, {});

export default tSummaryReducer;
