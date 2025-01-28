import axios from 'axios';

export const request = axios.create({
    baseURL: `http://192.168.1.7:3003/`,
    timeout: 1000,
});