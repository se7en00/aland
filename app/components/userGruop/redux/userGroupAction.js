import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './userGroupActionType';

//actions creater
export const getUserGroupList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_USER_GROUP_LIST,
    payload: () => Axios.get('/api/userGroups', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

