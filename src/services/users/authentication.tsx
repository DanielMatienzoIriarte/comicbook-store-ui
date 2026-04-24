import axios, { AxiosError } from 'axios';
import { userInterface, userLoginInterface, userRegisterInterface } from '../../interfaces/interfaces';

// Create an axios instance so we don't have to repeat config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api',
  withCredentials: true, // CRITICAL: This allows cookies to be sent/received
});

export const checkAuthStatus = async (): Promise<userInterface> => {
  try {
    // This hits a /me or /verify endpoint on your backend
    //const response = await apiClient.get<userInterface>('/me');
    const response = {data: {id: 0, fullname: 'string', email: 'string', password: 'pass'}};
    return response.data;
  } catch (error) {
    // If the cookie is expired or missing, the server returns 401.
    // We throw a specific error so the Provider knows the user is a "Guest".
    throw new Error("Unauthorized");
  }
};

export const loginUser = async (credentials: userLoginInterface): Promise<userInterface> => {
  try {
    const response = await apiClient.post<userInterface>('/login', credentials);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || "Invalid credentials");
  }
};

export const registerUser = async (userData: userRegisterInterface): Promise<userInterface> => {
  try {
    const response = await apiClient.post<userInterface>('/register', userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message: string }>;
    throw new Error(axiosError.response?.data?.message || "Registration failed");
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    // We hit the logout endpoint. 
    // The server should respond with: Set-Cookie: token=; Max-Age=0; ...
    await apiClient.post('/logout');
  } catch (error) {
    // We catch the error but don't necessarily "throw" it to the UI.
    // Even if the server is down, we want the user to FEEL logged out
    // on the frontend. The backend session will eventually timeout anyway.
    console.error("Server-side logout failed:", error);
  } finally {
    // Optional: If you were storing non-sensitive UI preferences in 
    // localStorage (like 'theme'), you'd clear them here.
    // localStorage.clear(); 
  }
};

/**
 * Redirects the user to the Backend Google Auth route.
 * The backend will then redirect to Google.
 */
export const initiateGoogleLogin = (): void => {
  const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
  // Standard OAuth flow: Browser leaves your app to visit the server
  window.location.href = `${backendUrl}/auth/google`;
};


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