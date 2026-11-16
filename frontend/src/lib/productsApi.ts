import { authApi } from './authApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  points: string[];
  buttonName?: string;
  buttonUrl?: string;
  banner?: string;
  mobileBanner?: string;
  order?: number;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

export const sortProducts = (items: Product[]): Product[] => {
  return [...items].sort((a, b) => {
    const orderA = typeof a.order === 'number' && a.order > 0 ? a.order : 999999;
    const orderB = typeof b.order === 'number' && b.order > 0 ? b.order : 999999;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
  });
};

export const productsApi = {
  async getAll() {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/products`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }

    return response.json();
  },

  async getPublic() {
    const response = await fetch(`${API_URL}/products/public/all`);

    if (!response.ok) {
      throw new Error('Failed to fetch public products');
    }

    return response.json();
  },

  async getBySlug(slug: string) {
    const response = await fetch(`${API_URL}/products/${slug}`);

    if (!response.ok) {
      throw new Error('Product not found');
    }

    return response.json();
  },

  async create(product: Omit<Product, 'id' | 'adminId' | 'createdAt' | 'updatedAt'>) {
    const token = authApi.getToken();
    const { createdAt, updatedAt, adminId, id, ...data } = product as any;
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create product');
    }

    return response.json();
  },

  async update(id: string, product: Partial<Omit<Product, 'id' | 'adminId' | 'createdAt' | 'updatedAt'>>) {
    const token = authApi.getToken();
    const { createdAt, updatedAt, adminId, id: _id, ...data } = product as any;
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      const message = Array.isArray(error.message)
        ? error.message.join(', ')
        : (error.message || 'Failed to update product');
      throw new Error(message);
    }

    return response.json();
  },

  async delete(id: string) {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }

    return response.json();
  },
};
