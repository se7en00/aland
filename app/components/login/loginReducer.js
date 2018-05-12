import typeToReducer from 'type-to-reducer';
import { LOGIN_REQUEST, LOGOUT_REQUEST } from './loginAction';

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
    [LOGOUT_REQUEST]: (state, action) => ({
        ...action.payload
    })
}, {});

export default login;
