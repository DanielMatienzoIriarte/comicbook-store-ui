import React from "react";
import axios from "axios";
import { userInterface, userLoginInterface } from './interfaces';

export const postUser = (user:userInterface) => {
  axios.post('http://127.0.0.1:8000/api/user', user)
  .then(response => window.location.href='/login')
  .catch(error => {alert('Error when creating a new user')});
};

export const login = (user:userLoginInterface) => {
  axios.post('http://127.0.0.1:8000/api/user/login', user)
  .then(response => window.location.href='/home')
  .catch(error => window.location.href='/login');
};

export const logout = () => {
  axios.get('http://127.0.0.1:8000/api/user/logout')
  .then(response => window.location.href='/login')
  .catch(error => {alert('Error when loging out a user')});
};

export const getLatestComicBooks = (limit: Number) => {
  return axios.get('http://127.0.0.1:8000/book/all/'+limit)
  .then(response => response.data.data)
  .catch(error => console.log('error', error));
};



/* export const getLatestComicBooks = async (limit: Number) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/book/all/'+limit);

    return response.data.data;
  } catch (error) {
    window.location.href='/home';
  }
}; */