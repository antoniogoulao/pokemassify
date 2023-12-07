import axios from 'axios';

export const BASE_URL = 'https://pokeapi.co/api/v2';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
