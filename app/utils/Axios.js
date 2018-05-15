import axios from 'axios';
import { BASE_URL } from 'constants';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});
//添加请求拦截器
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `token ${token}`;
    }
    return config;
}, error => Promise.reject(error));

export default instance;
