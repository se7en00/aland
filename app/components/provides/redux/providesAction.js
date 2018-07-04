import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './providesActionType';

//actions creater
export const getProvidesList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_PROVIDES_LIST,
    payload: () => Axios.get('/api/provides', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});


export const deleteProvide = (id) => ({
    type: TYPES.ASYNC_DELETE_PROVIDE,
    payload: () => Axios.delete(`/api/provides/${id}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_PROVIDES_LIST_SEARCH_PARAMS,
    payload: params
});
