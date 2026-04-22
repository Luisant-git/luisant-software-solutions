const API_URL = import.meta.env.VITE_API_URL;

export const careerApi = {
  submitApplication: async (formData: FormData) => {
    const response = await fetch(`${API_URL}/career/apply`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to submit application');
    }

    return response.json();
  },
};
