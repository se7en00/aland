import { Axios } from 'utils';
// import axios from 'axios';
import { URL } from 'constants';

export const LOAD_ACCOUNT_LIST = 'LOAD_ACCOUNT_LIST';
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

//actions creater
export const getUserList = () => ({
    type: LOAD_ACCOUNT_LIST,
    payload: () => Axios.get(URL.USER.LIST).then(response => response.data)
    // payload: () => axios.get(URL.USER.LIST).then(response => response.data)
});

// export const createUser = () => ({
//     type: CREATE_ACCOUNT,
//     payload: () => Axios.get('/api/account/list').then(response => response.data)
// });
