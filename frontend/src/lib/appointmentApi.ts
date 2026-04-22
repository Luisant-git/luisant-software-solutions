const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface AppointmentData {
  name: string;
  email: string;
  phone: string;
  businessType?: string;
  service: string;
  date?: string;
  time?: string;
  message?: string;
}

export const appointmentApi = {
  async submitAppointment(data: AppointmentData) {
    const response = await fetch(`${API_URL}/appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit appointment');
    }

    return response.json();
  },
};
