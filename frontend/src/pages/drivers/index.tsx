import { driversApi } from '@/api/drivers-api';
import DriverList from '@/components/driver-list';
import { NewDriverForm } from '@/components/forms/new-driver-form';
import { DeleteConfirmationModal } from '@/components/modals/delete-confirmation-modal';
import { UpdateDriverModal } from '@/components/modals/update-driver-modal';
import { Spinner } from '@/components/spinner';
import { Driver } from '@/types/driver';
import { useState, useEffect } from 'react';

export function Drivers() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    setLoading(true);
    try {
      const data = await driversApi.getAll();
      setDrivers(data);
    } catch (error) {
      console.error('Failed to fetch drivers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDriver = async (name: string, licenseNumber: string) => {
    setLoading(true);
    try {
      const newDriver = await driversApi.create({
        name,
        licenseNumber,
      });

      setDrivers([...drivers, newDriver]);
    } catch (error) {
      console.error('Failed to create driver:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDriver = async (updatedDriver: Driver) => {
    setLoading(true);
    try {
      const result = await driversApi.update(updatedDriver.id, updatedDriver);

      setDrivers(
        drivers.map((driver) => (driver.id === result.id ? result : driver))
      );

      setIsUpdateModalOpen(false);
    } catch (error) {
      console.error('Failed to update driver:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDriver = async () => {
    if (!selectedDriver) return;

    setLoading(true);
    try {
      await driversApi.delete(selectedDriver.id);
      setDrivers(drivers.filter((driver) => driver.id !== selectedDriver.id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Failed to delete driver:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <main className="flex-grow bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-6 text-2xl font-bold text-primary">Motoristas</h1>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <DriverList
              drivers={drivers}
              onUpdate={(driver) => {
                setSelectedDriver(driver);
                setIsUpdateModalOpen(true);
              }}
              onDelete={(id) => {
                setSelectedDriver(drivers.find((d) => d.id === id) || null);
                setIsDeleteModalOpen(true);
              }}
            />

            <NewDriverForm onSubmit={handleCreateDriver} />
          </div>
        </div>
      </main>

      <UpdateDriverModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        driver={selectedDriver}
        onUpdate={handleUpdateDriver}
      />

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteDriver}
        title="Excluir Motorista"
        description="Tem certeza que deseja excluir este motorista? Esta ação não pode ser desfeita."
      />
    </>
  );
}
