import typeToReducer from 'type-to-reducer';
import { LOGIN_REQUEST, SYNC_LOGOUT_REQUEST, FIND_PWD_REQUEST } from './loginAction';

//reducer
const login = typeToReducer({
    [LOGIN_REQUEST]: {
        REJECTED: (state, action) => ({
            isRejected: true,
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...action.payload
        })
    },
    //退出
    [SYNC_LOGOUT_REQUEST]: (state, action) => ({
        ...action.payload
    }),
    //找回密码
    [FIND_PWD_REQUEST]: {
        REJECTED: (state, action) => ({
            ...action?.payload
        }),
        FULFILLED: (state, action) => ({
            ...action?.payload
        })
    }
}, {});

export default login;
