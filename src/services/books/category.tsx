import axios from "axios";
import { categoryInterface, getCategoriesResultInterface } from '../../interfaces/interfaces';

export const getCategories = async (): Promise<categoryInterface[]> => {
  try {
    const response = await axios.get<getCategoriesResultInterface>('http://127.0.0.1:8000/api/books/categories');

    if (response.data.status === 'success') {
      return response.data.categories;
    } else {
      return [];
    }    
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      
      // Handle different HTTP status codes
      if (error.response?.status === 404) {
        throw new Error("Categories endpoint not found.");
      }
      if (error.response?.status === 500) {
        throw new Error("Server error. Please try again later.");
      }

      // Fallback to server message or default axios message
      throw new Error(serverMessage || error.message);
    }

    // Generic fallback for non-axios errors (e.g., code crashes)
    throw new Error("An unexpected error occurred while fetching categories.");
  }
};
