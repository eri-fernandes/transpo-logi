'use client';

import { trucksApi } from '@/api/truck-api';
import { Spinner } from '@/components/spinner';
import { Truck } from '@/types/truck';
import { useState, useEffect } from 'react';

export default function Dashboard() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [trucksData] = await Promise.all([trucksApi.getAll()]);
        setTrucks(trucksData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="flex-grow bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-6 text-2xl font-bold text-primary">
          Dashboard TranspoLogi
        </h1>
        {/* <Summary trucks={trucks} deliveries={deliveries} /> */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* <DashboardTruckList trucks={trucks} /> */}
          {/* <DeliveryList deliveries={deliveries} /> */}
        </div>
      </div>
    </main>
  );
}
