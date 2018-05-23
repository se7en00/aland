import axios from 'axios';
import { BASE_URL } from 'constants';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
    // withCredentials: true,
    // transformRequest: [(data) => JSON.stringify(data.data)],
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});
//添加请求拦截器
instance.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
        config.headers.common.token = token;
    //     config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    }
    return config;
}, error => Promise.reject(error));

export default instance;
