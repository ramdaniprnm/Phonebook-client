import axios from 'axios';

export const url = () => {
    const port = 3002;
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:${port}`
};

export const request = axios.create({
    baseURL: `${url()}/api/phonebook`,
    timeout: 1000,
});