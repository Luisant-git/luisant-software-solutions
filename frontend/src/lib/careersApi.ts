const API_URL = import.meta.env.VITE_API_URL;

export interface Career {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city?: string;
  skills?: string;
  resumeUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export const careersApi = {
  getAll: async (): Promise<Career[]> => {
    const response = await fetch(`${API_URL}/career/applications`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch careers');
    }

    return response.json();
  },
};
