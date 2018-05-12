import typeToReducer from 'type-to-reducer';
import { LOAD_DASHBOARD } from './dashboardAction';

const initialState = {
    list: []
};
//reducer
const getPanelList = typeToReducer({
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

export default getPanelList;
