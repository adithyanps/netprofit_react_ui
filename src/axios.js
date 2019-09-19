import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/'
});
// const instance = axios.create({
//     baseURL: 'http://35.222.87.140:8000/api/'
// });


export default instance;
