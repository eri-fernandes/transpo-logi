import DeliveryList from '@/components/delivery-list';
import { NewDeliveryForm } from '@/components/forms/new-delivery-form';

export function Deliveries() {
  return (
    <main className="flex-grow bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-primary mb-6 text-2xl font-bold">
          Gerenciamento de Entregas
        </h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <DeliveryList />
          <NewDeliveryForm />
        </div>
      </div>
    </main>
  );
}
