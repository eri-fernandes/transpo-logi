import { driversApi } from '@/api/drivers-api';
import { trucksApi } from '@/api/truck-api';
import NewTruckForm from '@/components/forms/new-truck-form';
import { DeleteConfirmationModal } from '@/components/modals/delete-confirmation-modal';
import { UpdateTruckModal } from '@/components/modals/update-truck-modal';
import { Spinner } from '@/components/spinner';
import { TruckList } from '@/components/truck-list';
import { useToast } from '@/hooks/use-toast';
import { Driver } from '@/types/driver';
import { Truck } from '@/types/truck';
import { useEffect, useState } from 'react';

export function Trucks() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
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

  async function handleCreateTruck(licensePlate: string, driver: string) {
    setLoading(true);
    try {
      const newTruck = await trucksApi.create({ licensePlate, driver });
      setTrucks([...trucks, newTruck]);
      toast({
        title: 'Caminhão criado com sucesso',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: 'Erro ao criar caminhão',
        variant: 'destructive',
        description: error.response?.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateTruck(updatedTruck: Truck) {
    setLoading(true);
    try {
      const result = await trucksApi.update(updatedTruck.id, updatedTruck);
      setTrucks(
        trucks.map((truck) => (truck.id === result.id ? result : truck))
      );
      setIsUpdateModalOpen(false);
      toast({
        title: 'Caminhão atualizado com sucesso',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao atualizar caminhão',
        variant: 'destructive',
        description: error.response?.data.message,
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteTruck() {
    if (!selectedTruck) return;

    setLoading(true);
    try {
      await trucksApi.delete(selectedTruck.id);
      setTrucks(trucks.filter((truck) => truck.id !== selectedTruck.id));
      setIsDeleteModalOpen(false);
      toast({
        title: 'Caminhão excluído com sucesso',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Erro ao excluir caminhão',
        variant: 'destructive',
        description: error.response?.data.message,
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
          <h1 className="mb-6 text-2xl font-bold text-primary">Caminhões</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <TruckList
              trucks={trucks}
              onUpdate={(truck) => {
                setSelectedTruck(truck);
                setIsUpdateModalOpen(true);
              }}
              onDelete={(id) => {
                setSelectedTruck(trucks.find((t) => t.id === id) || null);
                setIsDeleteModalOpen(true);
              }}
            />
            <NewTruckForm onSubmit={handleCreateTruck} drivers={drivers} />
          </div>
        </div>
      </main>

      <UpdateTruckModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        truck={selectedTruck}
        onUpdate={handleUpdateTruck}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteTruck}
        title="Excluir Caminhão?"
        description="Tem certeza que deseja excluir este caminhão? Esta ação não pode ser desfeita."
      />
    </>
  );
}
