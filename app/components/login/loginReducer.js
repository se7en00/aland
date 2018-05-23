import typeToReducer from 'type-to-reducer';
import { LOGIN_REQUEST, LOGOUT_REQUEST, FIND_PWD_REQUEST } from './loginAction';

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
    [LOGOUT_REQUEST]: (state, action) => ({
        ...action.payload
    }),
    //找回密码
    [FIND_PWD_REQUEST]: {
        REJECTED: (state, action) => ({
            error: action.payload
        }),
        FULFILLED: (state, action) => ({
            ...action.payload
        })
    }
}, {});

export default login;
