export const LOAD_DASHBOARD = 'LOAD_DASHBOARD';

//actions creater
export const loadDashboard = () => ({
    type: LOAD_DASHBOARD,
    payload: () => fetch('/api/user/list').then(response => {
        console.log(response);
        return response.json();
    })
});
