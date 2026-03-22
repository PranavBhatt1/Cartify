import type { CartItem, User } from '../types';

const STORAGE_KEYS = {
  CART: 'cartify_cart',
  USER: 'cartify_user',
  FAVORITES: 'cartify_favorites',
  AUTH_TOKEN: 'cartify_auth_token',
} as const;
const PINCODE_KEY = 'cartify_pincode';

export const storage = {
  getCart: (): CartItem[] => {
    try {
      const cart = localStorage.getItem(STORAGE_KEYS.CART);
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error('Error reading cart from localStorage:', error);
      return [];
    }
  },

  setCart: (cart: CartItem[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  },

  getUser: (): User | null => {
    try {
      const user = localStorage.getItem(STORAGE_KEYS.USER);
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error('Error reading user from localStorage:', error);
      return null;
    }
  },

  setUser: (user: User | null): void => {
    try {
      if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  },

  getFavorites: (): string[] => {
    try {
      const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage:', error);
      return [];
    }
  },

  setFavorites: (favorites: string[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  },

  getAuthToken: (): string | null => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error reading auth token from localStorage:', error);
      return null;
    }
  },

  setAuthToken: (token: string | null): void => {
    try {
      if (token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      } else {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      }
    } catch (error) {
      console.error('Error saving auth token to localStorage:', error);
    }
  },

  getPincode: (): string => {
    try {
      return localStorage.getItem(PINCODE_KEY) || '';
    } catch (error) {
      console.error('Error reading pincode from localStorage:', error);
      return '';
    }
  },

  setPincode: (pincode: string): void => {
    try {
      if (pincode) {
        localStorage.setItem(PINCODE_KEY, pincode);
      } else {
        localStorage.removeItem(PINCODE_KEY);
      }
    } catch (error) {
      console.error('Error saving pincode to localStorage:', error);
    }
  },

  clearAll: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  },
};
