import { Axios } from 'utils';

export const ASYNC_LOAD_DASHBOARD = 'ASYNC_LOAD_DASHBOARD';

//actions creater
export const loadDashboard = () => ({
    type: ASYNC_LOAD_DASHBOARD,
    async payload() {
        const today = await Axios.get('/api/home/dashboard', {params: {time: 'TODAY'}})
            .then(response => response.data);
        const yesterday = await Axios.get('/api/home/dashboard', {params: {time: 'YESTERDAY'}})
            .then(response => response.data);
        const all = await Axios.get('/api/home/dashboard', {params: {time: 'ALL'}})
            .then(response => response.data);
        return {today, yesterday, all};
    }
});
