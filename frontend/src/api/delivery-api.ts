import api from '@/api/axiosConfig';
import { Delivery } from '@/types/delivery';

export const deliveryApi = {
  // Busca todas as entregas
  getAll: async (): Promise<Delivery[]> => {
    const response = await api.get<Delivery[]>('/deliveries');
    return response.data;
  },

  // Busca uma entrega pelo ID
  getById: async (id: string): Promise<Delivery> => {
    const response = await api.get<Delivery>(`/deliveries/${id}`);
    return response.data;
  },

  // Cria uma nova entrega
  create: async (delivery: Omit<Delivery, 'id'>): Promise<Delivery> => {
    const response = await api.post<Delivery>('/deliveries', delivery);
    return response.data;
  },

  // Atualiza uma entrega existente
  update: async (
    id: string,
    delivery: Partial<Delivery>
  ): Promise<Delivery> => {
    const response = await api.put<Delivery>(`/deliveries/${id}`, delivery);
    return response.data;
  },

  // Exclui uma entrega
  delete: async (id: string): Promise<void> => {
    await api.delete(`/deliveries/${id}`);
  },
};
