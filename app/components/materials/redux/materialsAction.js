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

export const getMaterial = (id) => ({
    type: TYPES.ASYNC_GET_MATERIAL,
    payload: () => Axios.get(`/api/multimedias/${id}`)
        .then(response => {
            const material = response.data;
            if (material?.tagInfoList?.length) {
                material.tagInfoList.forEach(item => {
                    material[item.type.toLowerCase()] = item.id;
                });
            }
            return material;
        })
        .catch(error => Promise.reject(error?.response?.data))
});

export const addMaterial = (id, material) => ({
    type: TYPES.ASYNC_ADD_MATERIAL,
    payload: () => Axios.post('/api/multimedias', material)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const editMaterial = (id, material) => ({
    type: TYPES.ASYNC_EDIT_MATERIAL,
    payload: () => Axios.put(`/api/multimedias/${id}`, material)
        .then(() => true)
        .catch(error => Promise.reject(error?.response?.data))
});

export const getCategories = () => ({
    type: TYPES.AYSNC_LOAD_CATEGORIES,
    payload: () => Axios.get('/api/dictionarys/dicType/CATEGORY')
        .then(response => {
            const { data = [] } = response;
            return data.map(item => ({name: item.name, code: item.code}));
        })
        .catch(error => Promise.reject(error?.response?.data))
});
