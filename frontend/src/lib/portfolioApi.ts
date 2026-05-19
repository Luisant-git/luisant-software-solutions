import { authApi } from './authApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  image: string;
  images?: string[];
  clientName?: string;
  technologies: string[];
  features: string[];
  link?: string;
  caseStudy?: string;
  results?: string[];
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PortfolioCategory {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export const portfolioApi = {
  async getAll() {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/portfolio`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch portfolios');
    }

    return response.json();
  },

  async getPublic() {
    const response = await fetch(`${API_URL}/portfolio/public/all`);

    if (!response.ok) {
      throw new Error('Failed to fetch public portfolios');
    }

    return response.json();
  },

  async getBySlug(slug: string) {
    const response = await fetch(`${API_URL}/portfolio/${slug}`);

    if (!response.ok) {
      throw new Error('Portfolio not found');
    }

    return response.json();
  },

  async getByCategory(category: string) {
    const response = await fetch(`${API_URL}/portfolio/category/${category}`);

    if (!response.ok) {
      throw new Error('Failed to fetch portfolios by category');
    }

    return response.json();
  },

  async getCategories() {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/portfolio/categories`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch portfolio categories');
    }

    return response.json();
  },

  async createCategory(category: { name: string }) {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/portfolio/categories`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create portfolio category');
    }

    return response.json();
  },

  async updateCategory(id: string, category: { name: string }) {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/portfolio/categories/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update portfolio category');
    }

    return response.json();
  },

  async deleteCategory(id: string) {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/portfolio/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMessage = 'Failed to delete portfolio category';
      try {
        const error = await response.json();
        errorMessage = error.message || errorMessage;
      } catch (e) {}
      throw new Error(errorMessage);
    }

    try {
      return await response.json();
    } catch (e) {
      return { success: true };
    }
  },

  async create(portfolio: Omit<Portfolio, 'id' | 'adminId' | 'createdAt' | 'updatedAt'>) {
    const token = authApi.getToken();
    const { createdAt, updatedAt, adminId, id, ...data } = portfolio as any;
    const response = await fetch(`${API_URL}/portfolio`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create portfolio');
    }

    return response.json();
  },

  async update(id: string, portfolio: Partial<Omit<Portfolio, 'id' | 'adminId' | 'createdAt' | 'updatedAt'>>) {
    const token = authApi.getToken();
    const { createdAt, updatedAt, adminId, ...data } = portfolio as any;
    const response = await fetch(`${API_URL}/portfolio/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update portfolio');
    }

    return response.json();
  },

  async delete(id: string) {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/portfolio/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete portfolio');
    }

    return response.json();
  },
};
