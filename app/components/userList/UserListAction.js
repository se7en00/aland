import { Axios } from 'utils';
import { URL } from 'constants';

export const SEARCH_USER = 'SEARCH_USER';
export const LOAD_ACCOUNT_LIST = 'LOAD_ACCOUNT_LIST';
export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const searchUserByName = (userName) => ({
    type: SEARCH_USER,
    payload: () => sleep(2000).then(() => Axios.get('api/users', {params: {name: userName}}))//eslint-disable-line
});

//actions creater
export const getUserList = () => ({
    type: LOAD_ACCOUNT_LIST,
    payload: () => Axios.get(URL.USER.LIST).then(response => response.data)
});

// export const createUser = () => ({
//     type: CREATE_ACCOUNT,
//     payload: () => Axios.get('/api/account/list').then(response => response.data)
// });
