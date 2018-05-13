import { Axios } from 'utils';

export const LOAD_DASHBOARD = 'LOAD_DASHBOARD';

//actions creater
export const loadDashboard = () => ({
    type: LOAD_DASHBOARD,
    payload: () => Axios.get('/api/user/list').then(response => response.data)
});
