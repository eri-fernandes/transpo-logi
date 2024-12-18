import api from '@/api/axiosConfig';
import { Truck } from '@/types/truck';

export const trucksApi = {
  getAll: async (): Promise<Truck[]> => {
    const response = await api.get<Truck[]>('/trucks');
    console.log(response.data);

    return response.data;
  },

  getById: async (id: number): Promise<Truck> => {
    const response = await api.get<Truck>(`/trucks/${id}`);
    return response.data;
  },

  create: async (truck: Omit<Truck, 'id'>): Promise<Truck> => {
    const response = await api.post<Truck>('/trucks', truck);
    return response.data;
  },

  update: async (id: number, truck: Partial<Truck>): Promise<Truck> => {
    const response = await api.put<Truck>(`/trucks/${id}`, truck);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/trucks/${id}`);
  },
};
