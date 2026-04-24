import axios from "axios";
import { categoryInterface, userInterface, userLoginInterface } from '../interfaces/interfaces';

export const postUser = (user:userInterface) => {
  axios.post('http://127.0.0.1:8000/api/user', user)
  .then(response => window.location.href='/login')
  .catch(error => {alert('Error when creating a new user')});
};


export const logout = () => {
  axios.get('http://127.0.0.1:8000/api/user/logout')
  .then(response => window.location.href='/login')
  .catch(error => {alert('Error when loging out a user')});
};

export const getComicBooks = async (page: Number, per_page: Number) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/books?page=' + page + '&per_page=' + per_page);
    return response.data.data.books;
  } catch (error) {
    return console.log('error', error);
  }
};



 export const searchComicBooks = async (searchCriteria: string) => {
  try {
     const response = await axios.get('http://127.0.0.1:8000/api/books/search/' + searchCriteria);
     return response.data.data;
   } catch (error) {
     return console.log('error', error);
   }
 };

 export const getComicBooksByCategory = async (category_id: string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/books/by-category/${category_id}`);
    return response.data.data;
  } catch (error) {
    return console.log('error', error);
  }
 };

 


/* export const getLatestComicBooks = async (limit: Number) => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/book/all/'+limit);

    return response.data.data;
  } catch (error) {
    window.location.href='/home';
  }
}; */