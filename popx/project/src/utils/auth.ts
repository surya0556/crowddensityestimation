import { User } from '../types';

export const registerUser = (userData: User): void => {
  // Store user in localStorage
  localStorage.setItem('users', JSON.stringify([
    ...getUsers(),
    userData
  ]));
  
  // Set current user
  localStorage.setItem('currentUser', JSON.stringify(userData));
};

export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  }
  
  return null;
};

export const getUsers = (): User[] => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const logoutUser = (): void => {
  localStorage.removeItem('currentUser');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('currentUser') !== null;
};