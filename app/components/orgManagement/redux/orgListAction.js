import { Axios } from 'utils/index';
import * as TYPES from './orgListActionType';

//actions creater
export const getOrgList = (pageSize = 2000) => ({
    type: TYPES.LOAD_USER_LIST,
    payload: () => Axios.get('/api/departments', {params: {size: pageSize}}).then(response => response.data)
});

