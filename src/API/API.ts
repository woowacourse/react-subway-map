import axios from 'axios';

const API = axios.create({
  baseURL: 'https://wedge-subway.p-e.kr/',
});

export default API;
