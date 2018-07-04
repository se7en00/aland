import typeToReducer from 'type-to-reducer';
import { ASYNC_LOAD_DASHBOARD } from './action';

//reducer
export default typeToReducer({
    [ASYNC_LOAD_DASHBOARD]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            ...action.payload
        })
    }
}, {});
