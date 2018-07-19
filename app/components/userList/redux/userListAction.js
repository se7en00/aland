import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './userListActionType';

//actions creater
export const getUserList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_USER_LIST,
    payload: () => Axios.get('/api/users', {params: {size: pageSize, isAdmin: 0, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const createUser = (params) => ({
    type: TYPES.ASYNC_CREATE_USER,
    async payload() {
        params.isAdmin = 0;
        const newUser = await Axios.post('/api/users', params)
            .then(response => response.data);
        if (params.userGroupId) {
            const userGroupDetails = await Axios.get(`/api/userGroups/${params.userGroupId}`).then(response => response.data);
            const users = userGroupDetails?.userInfoList?.reduce((arrays, item) => {
                arrays.push(item.id);
                return arrays;
            }, [newUser.id]);
            //update
            const userGroupParam = {
                title: userGroupDetails.title,
                description: userGroupDetails.description,
                userIds: users
            };
            await Axios.put(`/api/userGroups/${params.userGroupId}`, userGroupParam).then(response => response.data);
        }
        return newUser;
    }
});

export const updateUser = (userId, params) => ({
    type: TYPES.ASYNC_UPDATE_USER,
    async payload() {
        params.isAdmin = 0;
        const updatedUser = await Axios.put(`/api/users/${userId}`, params)
            .then(response => response.data);
        if (params.userGroupId) {
            console.log(params.userGroupId);
            const userGroupDetails = await Axios.get(`/api/userGroups/${params.userGroupId}`).then(response => response.data);
            const users = userGroupDetails?.userInfoList?.reduce((arrays, item) => {
                arrays.push(item.id);
                return arrays;
            }, [userId]);
            //update
            const userGroupParam = {
                title: userGroupDetails.title,
                description: userGroupDetails.description,
                userIds: users
            };
            await Axios.put(`/api/userGroups/${params.userGroupId}`, userGroupParam).then(response => response.data);
        }
        return updatedUser;
    }
});

export const deleteUser = (userId) => ({
    type: TYPES.ASYNC_DELETE_USER,
    payload: () => Axios.delete(`/api/users/${userId}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_USER_LIST_SEARCH_PARAMS,
    payload: params
});

export const getALLAssociations = () => {
    const allPromises = [
        Axios.get('/api/departments', {params: {size: 2000}}).then(response => response.data),
        Axios.get('/api/users/userLevels').then(response => response.data),
        Axios.get('api/dictionarys/dicType/GENDER').then(response => response.data.map(item => ({code: item.code, name: item.name}))),
        Axios.get('/api/users/userStatus').then(response => response.data),
        Axios.get('/api/userGroups', {params: {size: 2000}}).then(response => {
            if (!response?.data?.elements) return [];
            return response?.data?.elements?.map(item => ({id: item.id, name: item.title}));
        })
    ];
    return {
        type: TYPES.ASYNC_LOAD_USERS_ASSOCIATIONS,
        payload: Promise.all(allPromises).then(result => ({
            departments: result[0].elements.map(item => ({id: item.id, name: item.name})),
            userLevels: result[1],
            genders: result[2],
            userStatus: result[3],
            userGroups: result[4]
        })).catch(error => Promise.reject(error?.response?.data))
    };
};

export const getUserDetails = (userId) => ({
    type: TYPES.ASYNC_USER_DETAILS,
    payload: () => Axios.get(`/api/users/${userId}`)
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

