import { Axios, paginationSetting } from 'utils/index';
import * as TYPES from './materialsActionType';

//actions creater
export const getMaterialsList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_MATERIALS_LIST,
    payload: () => Axios.get('/api/multimedias', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});


export const deleteMaterial = (id) => ({
    type: TYPES.ASYNC_DELETE_MATERIAL,
    payload: () => Axios.delete(`/api/multimedias/${id}`)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_MATERIALS_LIST_SEARCH_PARAMS,
    payload: params
});
