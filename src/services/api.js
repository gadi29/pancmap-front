import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pancmap-back-production.up.railway.app/'
});

export default instance;