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
    }
}, {});


export default userReducer;
