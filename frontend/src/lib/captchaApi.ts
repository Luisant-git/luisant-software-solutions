const API_URL = import.meta.env.VITE_API_URL;

export interface CaptchaData {
  id: string;
  image: string;
}

export const captchaApi = {
  generate: async (): Promise<CaptchaData> => {
    const response = await fetch(`${API_URL}/captcha/generate`);
    if (!response.ok) {
      throw new Error('Failed to generate CAPTCHA');
    }
    return response.json();
  },

  verify: async (id: string, code: string): Promise<{ valid: boolean }> => {
    const response = await fetch(`${API_URL}/captcha/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, code }),
    });
    if (!response.ok) {
      throw new Error('Failed to verify CAPTCHA');
    }
    return response.json();
  },
};
