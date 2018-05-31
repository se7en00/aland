// import { Axios } from 'utils';
import axios from 'axios';

export const LOAD_DASHBOARD = 'LOAD_DASHBOARD';

//actions creater
export const loadDashboard = () => ({
    type: LOAD_DASHBOARD,
    payload: () => axios.get('/api/account/list').then(response => response.data)
});
