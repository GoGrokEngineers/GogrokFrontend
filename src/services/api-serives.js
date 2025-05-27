// src/services/api-service.js
import axios from 'axios';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,            // bump timeout to 15s
  headers: { 'Content-Type': 'application/json' },
});

export const createCompetition = (payload) =>
  client.post('/', payload).then(res => res.data);

export const joinCompetition = (payload) =>
  client.post('/join/', payload).then(res => res.data);


export default client;
