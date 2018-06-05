import axios from 'axios';
import { paginationSetting } from 'utils/index';
import * as TYPES from './oneClickActionTypes';

export const getOneClickList = (pageSize = paginationSetting.pageSize, page) => ({
    type: TYPES.LOAD_ONE_CLICK_LIST,
    payload: () => axios.get('/api/oneClick', {params: {size: pageSize, page}}).then(response => response.data)
});
