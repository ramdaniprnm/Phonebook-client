import axios from 'axios';

// export const url = () => {
//     const port = 3003;
//     const { protocol, hostname } = window.location;
//     return `${protocol}//${hostname}:${port}`
// };``

export const request = axios.create({
    baseURL: `http://192.168.1.7:3003/`,
    timeout: 1000,
});