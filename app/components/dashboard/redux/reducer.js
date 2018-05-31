import typeToReducer from 'type-to-reducer';
import { LOAD_DASHBOARD } from './action';

const initialState = {
    list: []
};
//reducer
export default typeToReducer({
    [LOAD_DASHBOARD]: {
        PENDING: () => ({
            ...initialState
        }),
        REJECTED: (state, action) => ({
            ...initialState,
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...initialState,
            isFulfilled: true,
            list: action.payload
        })
    }
}, initialState);
