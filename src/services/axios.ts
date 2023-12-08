import axios from 'axios';

export const BASE_URL = 'https://pokeapi.co';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
