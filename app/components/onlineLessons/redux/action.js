import axios from 'axios';
import { paginationSetting } from 'utils/index';
import * as TYPES from './actionTypes';

export const getOnlineLessonsList = (pageSize = paginationSetting.pageSize, page) => ({
    type: TYPES.LOAD_ONLINE_LESSONS_LIST,
    payload: () => axios.get('/api/onlineLessons', {params: {size: pageSize, page}}).then(response => response.data)
});
