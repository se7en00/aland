import typeToReducer from 'type-to-reducer';
import * as TYPES from './oneClickActionTypes';

export default typeToReducer({
    //线上课程列表
    [TYPES.LOAD_ONE_CLICK_LIST]: {
        REJECTED: (state, action) => ({
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            list: action.payload
        })
    }
}, {});
