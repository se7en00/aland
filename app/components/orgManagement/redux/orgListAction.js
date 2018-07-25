import { Axios } from 'utils/index';
import * as TYPES from './orgListActionType';

//actions creater
export const getOrgList = (pageSize = 2000) => ({
    type: TYPES.LOAD_USER_LIST,
    payload: () => Axios.get('/api/departments', {params: {size: pageSize}}).then(response => response.data)
});

export const syncGetAssociatedUser = (id, type) => ({
    type: TYPES.ASYNC_GET_ASSOCIATED_USER,
    async payload() {
        const userAsync = await Axios.get('/api/users', {params: {size: 1000, userType: '正式员工', status: 'ACTIVE', isAdmin: 0}})
            .then(response => response.data?.elements).catch(() => ([]));
        const associatedAsync = await Axios.get(`/api/departments/${id}/posts/${type}`)
            .then(response => response.data).catch(() => ([]));
        return {
            users: userAsync,
            associatedUsers: associatedAsync,
            dept: {id, type}
        };
    }
});

export const saveAssociatedUsers = (id, type, userIds) => ({
    type: TYPES.ASYNC_SAVE_ASSOCIATED_USER,
    payload: () => Axios.post(`/api/departments/${id}/posts/${type}`, { userIds }).then(response => response.data)
});
