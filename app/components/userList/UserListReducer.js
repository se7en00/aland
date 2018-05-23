import typeToReducer from 'type-to-reducer';
import { LOAD_ACCOUNT_LIST, SEARCH_USER } from './UserListAction';

//reducer
const userReducer = typeToReducer({
    [LOAD_ACCOUNT_LIST]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            list: action.payload
        })
    },

    [SEARCH_USER]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            users: action.payload
        })
    }
}, {});


export default userReducer;
