import typeToReducer from 'type-to-reducer';
import * as TYPES from './userListActionType';

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
    //新增用户
    [TYPES.CREATE_USER]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => {
            const createUser = action.payload;
            const list = state?.list;
            list?.elements.push(createUser);
            return {
                // isFulfilled: true,
                list
            };
        }
    },

    [TYPES.UPDATE_USER]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({...state})
    },

    [TYPES.DELETE_USER]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({...state})
    },

    //获取当前编辑用户信息
    [TYPES.SYNC_EDIT_USER]: (state, action) => ({
        ...state,
        editUser: action.payload
    }),

    [TYPES.SEARCH_USER]: {
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
