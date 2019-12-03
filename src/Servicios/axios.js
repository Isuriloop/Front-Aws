import axios from 'axios';

export const API = axios.create({

baseURL:`http://ec2-3-86-250-223.compute-1.amazonaws.com:8000/api/`


})