import axios from 'axios';
import { BASE_URL } from 'constants';
import { logout } from 'components/login/redux/loginAction';
import configureStore from '../redux/configureStore';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
    // withCredentials: true,
    // transformResponse: [(data) => {
    //     if (typeof data === 'string') {
    //         try {
    //             data = JSON.parse(data); //eslint-disable-line
    //         } catch (e) { /* Ignore */ }
    //     }
    //     return data;
    // }]
});
//添加请求拦截器
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.common.token = token;
    }
    return config;
}, error => Promise.reject(error));

instance.interceptors.response.use(response => response, error => {
    const {data} = error?.response;

    if (data?.errorCode === 'authorization_error') {
        const store = configureStore();
        logout()(store.dispatch);
    }
    return Promise.reject(error);
});

export default instance;
