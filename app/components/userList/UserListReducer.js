import typeToReducer from 'type-to-reducer';
import { LOAD_USER_LIST, SEARCH_USER, CREATE_USER } from './UserListAction';

//reducer
const userReducer = typeToReducer({
    //用户列表
    [LOAD_USER_LIST]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            list: action.payload
        })
    },
    //新增用户
    [CREATE_USER]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => {
            const createUser = action.payload;
            const list = state?.list;
            list?.elements.push(createUser);
            return {
                isFulfilled: true,
                list
            };
        }
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
