import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://wa-group-clone-server.herokuapp.com/',
});

export default instance;