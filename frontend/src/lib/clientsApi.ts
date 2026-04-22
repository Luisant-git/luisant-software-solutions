import { authApi } from './authApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface Client {
  id: string;
  name: string;
  logo: string;
  adminId: string;
  createdAt: string;
  updatedAt: string;
}

export const clientsApi = {
  async getAll() {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/clients`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch clients');
    }

    return response.json();
  },

  async getPublic() {
    const response = await fetch(`${API_URL}/clients/public/all`);

    if (!response.ok) {
      throw new Error('Failed to fetch public clients');
    }

    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`${API_URL}/clients/${id}`);

    if (!response.ok) {
      throw new Error('Client not found');
    }

    return response.json();
  },

  async create(client: Omit<Client, 'id' | 'adminId' | 'createdAt' | 'updatedAt'>) {
    const token = authApi.getToken();
    const { createdAt, updatedAt, adminId, id, ...data } = client as any;
    const response = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create client');
    }

    return response.json();
  },

  async update(id: string, client: Partial<Omit<Client, 'id' | 'adminId' | 'createdAt' | 'updatedAt'>>) {
    const token = authApi.getToken();
    const { createdAt, updatedAt, adminId, ...data } = client as any;
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update client');
    }

    return response.json();
  },

  async delete(id: string) {
    const token = authApi.getToken();
    const response = await fetch(`${API_URL}/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete client');
    }

    return response.json();
  },
};
