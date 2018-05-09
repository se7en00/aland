export const LOGIN_LOADING = 'LOGIN_LOADING';

//actions creater
export const loadDashboard = () => ({
    type: LOGIN_LOADING,
    payload: () => fetch('/api/user/list').then(response => {
        console.log(response);
        return response.json();
    })
});
