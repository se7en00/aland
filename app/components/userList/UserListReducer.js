import typeToReducer from 'type-to-reducer';
import { LOAD_ACCOUNT_LIST } from './UserListAction';

//reducer
const getUserList = typeToReducer({
    [LOAD_ACCOUNT_LIST]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            list: action.payload
        })
    }
}, {});

export default getUserList;
