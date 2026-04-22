import { authApi } from './authApi';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const uploadApi = {
  async uploadFile(file: File): Promise<{ filename: string; url: string }> {
    const token = authApi.getToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'File upload failed');
    }

    return response.json();
  },

  getFileUrl(filename: string): string {
    return `${API_URL}/uploads/${filename}`;
  },
};
