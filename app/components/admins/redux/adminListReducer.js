import typeToReducer from 'type-to-reducer';
import * as TYPES from './adminListActionType';

//reducer
const adminsReducer = typeToReducer({
    //用户列表
    [TYPES.ASYNC_LOAD_ADMIN_LIST]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                list: action.payload
            };
        }
    },
    //新增用户
    [TYPES.ASYNC_CREATE_ADMIN]: {
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

    [TYPES.ASYNC_UPDATE_ADMIN]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({...state})
    },

    [TYPES.ASYNC_DELETE_ADMIN]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({...state})
    },

    //获取当前编辑用户信息
    [TYPES.SYNC_EDIT_ADMIN]: (state, action) => {
        const {id, loginName, name} = action.payload;
        return {
            ...state,
            editUser: {id, loginName, name}
        };
    },

    //重置密码
    [TYPES.ASYNC_RESET_ADMIN_PASSWORD]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state) => ({
            ...state
        })
    },

    //更新密码
    [TYPES.ASYNC_CHANGE_ADMIN_PASSWORD]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state) => ({
            ...state
        })
    },

    //读取权限
    [TYPES.ASYNC_LOAD_ADMIN_PERMISSIONS]: {
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
    [TYPES.ASYNC_UPDATE_ADMIN_PERMISSIONS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({...state})
    }
}, {});


export default adminsReducer;
