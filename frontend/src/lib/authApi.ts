const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const authApi = {
  async login(username: string, password: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    return response.json();
  },

  getToken() {
    return localStorage.getItem('luisant_admin_token');
  },

  setToken(token: string) {
    localStorage.setItem('luisant_admin_token', token);
  },

  removeToken() {
    localStorage.removeItem('luisant_admin_token');
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
