import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000/api'
});

export const getPosts = async () => await API.get('/post/');
export const createPost = async (data) => await API.post('/post/', data);
export const generateImage = async (data) => await API.post('/generateImage/', data);