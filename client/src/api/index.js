import axios from 'axios';

const API = axios.create({
    baseURL: 'https://ai-image-generator-3ico.onrender.com/api'
});

export const getPosts = async () => await API.get('/post/');
export const createPost = async (data) => await API.post('/post/', data);
export const generateImage = async (data) => await API.post('/generateImage/', data);