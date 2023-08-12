import Axios from 'axios';

import { API_URL } from '../config';
import toast from 'react-hot-toast';

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  (error) => {
    const message = error.response?.data || error.message;
    toast.error(message, { className: 'text-error' });
    return Promise.reject(error);
  }
);
