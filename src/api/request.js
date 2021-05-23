import axios from 'axios';

const request = axios.create({
  baseURL: 'https://jerry-subway.o-r.kr/',
});

request.defaults.headers.post['Content-Type'] = 'application/json';

export default request;
