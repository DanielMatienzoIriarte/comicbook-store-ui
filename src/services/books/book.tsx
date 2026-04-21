import axios from "axios";
import { bookInterface, BookResponseInterface, getLatestBooksInterface } from '../../interfaces/interfaces';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/books',
});

export const getLatestComicBooks = async(limit: Number): Promise<bookInterface[]> => {
  try {
    const response = await axios.get<getLatestBooksInterface>('http://127.0.0.1:8000/api/books/all');

    if (response.data.status === 'success') {
      return response.data.books;
    } else {
      return [];
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      
      // Handle different HTTP status codes
      if (error.response?.status === 404) {
        throw new Error("Books endpoint not found.");
      }
      if (error.response?.status === 500) {
        throw new Error("Server error. Please try again later.");
      }

      // Fallback to server message or default axios message
      throw new Error(serverMessage || error.message);
    }

    // Generic fallback for non-axios errors (e.g., code crashes)
    throw new Error("An unexpected error occurred while fetching books.");
  }
};

export const getComicBookById = async (book_id: string) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/books/${book_id}`);
    
    return response.data.data ?? [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      
      // Handle different HTTP status codes
      if (error.response?.status === 404) {
        throw new Error("Books endpoint not found.");
      }
      if (error.response?.status === 500) {
        throw new Error("Server error. Please try again later.");
      }

      // Fallback to server message or default axios message
      throw new Error(serverMessage || error.message);
    }

    // Generic fallback for non-axios errors (e.g., code crashes)
    throw new Error("An unexpected error occurred while fetching books.");
  }
 };

export const searchBooks = async (query: string, page: number = 1): Promise<BookResponseInterface> => {
  try {
    const response = await api.get(`/search`, {
      params: { 
        q: query,
        page: page
      }
    });

      console.log('13', response);
    if (response.data.status === 'success') {
      console.log('22', response.data);
      return response.data.data;
    } else {
      return {
        current_page: 0,
        data: [],
        first_page_url: '',
        from:0,
        last_page: 0,
        last_page_url: '',
        links: [],
        next_page_url: null,
        path: '', 
        per_page: 0,
        prev_page_url: null,
        to: 0,
        total: 0
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      
      // Handle different HTTP status codes
      if (error.response?.status === 404) {
        throw new Error("Books endpoint not found.");
      }
      if (error.response?.status === 500) {
        throw new Error("Server error. Please try again later.");
      }

      // Fallback to server message or default axios message
      throw new Error(serverMessage || error.message);
    }

    // Generic fallback for non-axios errors (e.g., code crashes)
    throw new Error("An unexpected error occurred while fetching books.");
  }
};