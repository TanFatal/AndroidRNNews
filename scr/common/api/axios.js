import axios from 'axios';
import { API_URL_DANTRI } from '.';

const instance = axios.create({
  baseURL: API_URL_DANTRI,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

export default instance;