import typeToReducer from 'type-to-reducer';
import * as TYPES from './userGroupActionType';

//reducer
const userReducer = typeToReducer({
    //用户列表
    [TYPES.ASYNC_LOAD_USER_GROUP_LIST]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            list: action.payload
        })
    },
    //新增用户
    [TYPES.ASYNC_CREATE_USER_GROUP]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state,
            createUserGroup: action.payload
        })
    },

    [TYPES.ASYNC_UPDATE_USER_GROUP]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action?.payload?.response?.data
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_DELETE_USER_GROUP]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state
        })
    },

    [TYPES.ASYNC_USER_GROUP_DETAILS]: {
        REJECTED: (state, action) => ({
            ...state,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...state,
            userGroupDetails: action.payload
        })
    },

    [TYPES.SYNC_CLEAR_USER_GROUP_DETAILS]: (state, action) => ({
        ...state,
        userGroupDetails: action.payload
    })
}, {});


export default userReducer;
