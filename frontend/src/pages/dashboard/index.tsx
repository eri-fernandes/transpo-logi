import DeliveryList from '@/components/delivery-list';
import Summary from '@/components/summary';
import { TruckList } from '@/components/truck-list';

export function Dashboard() {
  return (
    <main className="flex-grow bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Summary />

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          <TruckList />
          <DeliveryList />
        </div>
      </div>
    </main>
  );
}
