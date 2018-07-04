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
            ...state
        })
    }
}, {});


export default userReducer;
