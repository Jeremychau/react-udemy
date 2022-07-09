import axios from 'axios';

const userItem = JSON.parse(localStorage.getItem('userData'));

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_PATH
});

instance.defaults.headers.common['Authorization'] = (userItem)? `Bearer ${userItem.token}` : ''

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;