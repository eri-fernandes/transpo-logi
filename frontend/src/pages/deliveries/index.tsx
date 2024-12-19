import { useState, useEffect } from 'react';
import { NewDeliveryForm } from '@/components/forms/new-delivery-form';
import { DeleteConfirmationModal } from '@/components/modals/delete-confirmation-modal';
import { UpdateDeliveryModal } from '@/components/modals/update-delivery-modal';
import { Spinner } from '@/components/spinner';
import { useToast } from '@/hooks/use-toast';
import { Delivery } from '@/types/delivery';
import { deliveryApi } from '@/api/delivery-api';
import { DeliveryList } from '@/components/delivery-list';
import { Driver } from '@/types/driver';
import { driversApi } from '@/api/drivers-api';
import { trucksApi } from '@/api/truck-api';
import { Truck } from '@/types/truck';

export function Deliveries() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchDrivers() {
      setLoading(true);
      try {
        const data = await driversApi.getAll();
        setDrivers(data);
      } catch (error) {
        console.error('Failed to fetch drivers:', error);
        toast({
          title: 'Erro ao buscar motoristas',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDrivers();
  }, []);

  useEffect(() => {
    async function fetchTrucks() {
      setLoading(true);

      try {
        const data = await trucksApi.getAll();
        setTrucks(data);
      } catch (error: any) {
        toast({
          title: 'Erro ao buscar caminhões',
          variant: 'destructive',
          description: error.response?.data.message,
        });
      } finally {
        setLoading(false);
      }
    }

    fetchTrucks();
  }, []);

  useEffect(() => {
    async function fetchDeliveries() {
      setLoading(true);
      try {
        const data = await deliveryApi.getAll();
        setDeliveries(data);
      } catch (error: any) {
        toast({
          title: 'Erro ao buscar entregas',
          variant: 'destructive',
          description: error.response?.data.message || 'Algo deu errado.',
        });
      } finally {
        setLoading(false);
      }
    }

    fetchDeliveries();
  }, []);

  async function handleCreateDelivery(delivery: Delivery) {
    setLoading(true);
    try {
      const newDelivery = await deliveryApi.create(delivery);
      setDeliveries([...deliveries, newDelivery]);
      toast({
        title: 'Entrega criada com sucesso',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao criar entrega',
        variant: 'destructive',
        description: error.response?.data.message || 'Algo deu errado.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateDelivery(updatedDelivery: Delivery) {
    setLoading(true);
    try {
      const result = await deliveryApi.update(
        updatedDelivery.id!,
        updatedDelivery
      );
      setDeliveries(
        deliveries.map((delivery) =>
          delivery.id === result.id ? result : delivery
        )
      );
      setIsUpdateModalOpen(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao atualizar entrega',
        variant: 'destructive',
        description: error.response?.data.message || 'Algo deu errado.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteDelivery() {
    if (!selectedDelivery) return;

    setLoading(true);
    try {
      await deliveryApi.delete(selectedDelivery.id!);
      setDeliveries(
        deliveries.filter((delivery) => delivery.id !== selectedDelivery.id)
      );
      setIsDeleteModalOpen(false);
    } catch (error: any) {
      toast({
        title: 'Erro ao excluir entrega',
        variant: 'destructive',
        description: error.response?.data.message || 'Algo deu errado.',
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-6 text-2xl font-bold text-primary">Entregas</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <DeliveryList
              deliveries={deliveries}
              onUpdate={(delivery) => {
                setSelectedDelivery(delivery);
                setIsUpdateModalOpen(true);
              }}
              onDelete={(id) => {
                setSelectedDelivery(
                  deliveries.find((d) => d.id === id) || null
                );
                setIsDeleteModalOpen(true);
              }}
            />

            <NewDeliveryForm
              onSubmit={handleCreateDelivery}
              drivers={drivers}
              trucks={trucks}
            />
          </div>
        </div>
      </main>

      <UpdateDeliveryModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        delivery={selectedDelivery}
        onUpdate={handleUpdateDelivery}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteDelivery}
        title="Excluir Entrega"
        description="Tem certeza que deseja excluir esta entrega? Esta ação não pode ser desfeita."
      />
    </>
  );
}
