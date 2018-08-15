//actions creater
import { Axios, paginationSetting } from 'utils';
import * as TYPES from './summaryActionTypes';

export const getSummaryList = ({pageSize = paginationSetting.pageSize, ...rest}) => ({
    type: TYPES.ASYNC_LOAD_TRAINING_TASK_SUMMARY_LIST,
    payload: () => Axios.get('/api/taskTraining', {params: {size: pageSize, ...rest}})
        .then(response => response.data)
        .catch(error => Promise.reject(error?.response?.data))
});

export const setSearchParamsToRedux = (params) => ({
    type: TYPES.SYNC_SUMMARY_LIST_SEARCH_PARAMS,
    payload: params
});
