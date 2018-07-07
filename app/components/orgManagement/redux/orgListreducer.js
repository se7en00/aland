import typeToReducer from 'type-to-reducer';
import * as TYPES from './orgListActionType';

//reducer
const userReducer = typeToReducer({
    //用户列表
    [TYPES.LOAD_USER_LIST]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            list: action.payload
        })
    },
    [TYPES.ASYNC_GET_ASSOCIATED_USER]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            users: action.payload.users,
            associatedUsers: action.payload.associatedUsers,
            dept: action.payload.dept
        })
    },
    [TYPES.ASYNC_SAVE_ASSOCIATED_USER]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            state
        })
    }
}, {});


export default userReducer;
