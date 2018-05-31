import typeToReducer from 'type-to-reducer';
import * as TYPES from './loginActionTypes';

//reducer
const login = typeToReducer({
    [TYPES.LOGIN_REQUEST]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...action.payload
        })
    },
    //退出
    [TYPES.SYNC_LOGOUT_REQUEST]: (state, action) => ({
        ...action.payload
    }),
    //找回密码
    [TYPES.FIND_PWD_REQUEST]: {
        REJECTED: (state, action) => ({
            ...action?.payload
        }),
        FULFILLED: (state, action) => ({
            ...action?.payload
        })
    }
}, {});

export default login;
