import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_PATH
});

// instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;