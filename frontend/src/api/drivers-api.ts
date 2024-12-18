import api from '@/api/axiosConfig'; // Configuração do Axios
import { Driver } from '@/types/driver';

export const driversApi = {
  getAll: async (): Promise<Driver[]> => {
    const response = await api.get<Driver[]>('/drivers');
    return response.data;
  },

  getById: async (id: string): Promise<Driver> => {
    const response = await api.get<Driver>(`/drivers/${id}`);
    return response.data;
  },

  create: async (driver: Omit<Driver, 'id'>): Promise<Driver> => {
    const response = await api.post<Driver>('/drivers', driver);
    return response.data;
  },

  update: async (id: string, driver: Partial<Driver>): Promise<Driver> => {
    const response = await api.put<Driver>(`/drivers/${id}`, driver);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/drivers/${id}`);
  },
};
