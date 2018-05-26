import { Axios, paginationSetting } from 'utils';
import { URL } from 'constants';

export const SEARCH_USER = 'SEARCH_USER';
export const LOAD_USER_LIST = 'LOAD_USER_LIST';
export const CREATE_USER = 'CREATE_USER';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
export const searchUserByName = (userName) => ({
    type: SEARCH_USER,
    payload: () => sleep(2000).then(() => Axios.get('api/users', {params: {name: userName}}))//eslint-disable-line
});

//actions creater
export const getUserList = (pageSize = paginationSetting.pageSize, page) => ({
    type: LOAD_USER_LIST,
    payload: () => Axios.get(URL.USER.LIST, {params: {size: pageSize, page}}).then(response => response.data)
});

export const createUser = (loginName, name) => ({
    type: CREATE_USER,
    payload: () => Axios.post('/api/users', {loginName, name})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});
