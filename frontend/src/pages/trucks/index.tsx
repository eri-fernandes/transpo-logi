import { NewTruckForm } from '@/components/forms/new-truck-form';
import { TruckList } from '@/components/truck-list';

export function Trucks() {
  return (
    <main className="flex-grow bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-primary mb-6 text-2xl font-bold">
          Gerenciamento de Caminhões
        </h1>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <TruckList />
          <NewTruckForm />
        </div>
      </div>
    </main>
  );
}
