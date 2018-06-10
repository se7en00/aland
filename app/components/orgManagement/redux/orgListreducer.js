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
    [TYPES.SYNC_EDIT_USER]: (state, action) => {
        const {id, loginName, name} = action.payload;
        return {
            ...state,
            editUser: {id, loginName, name}
        };
    },

    //重置密码
    [TYPES.RESET_USER_PASSWORD]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state) => ({
            ...state
        })
    },

    //读取权限
    [TYPES.LOAD_USER_PERMISSIONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state,
            permissions: action.payload
        })
    },

    //更新权限
    [TYPES.UPDATE_USER_PERMISSIONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({...state})
    },

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
