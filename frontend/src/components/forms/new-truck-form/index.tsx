import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NewTruckFormProps {
  onSubmit: (licensePlate: string, driver: string) => void;
}

export default function NewTruckForm({ onSubmit }: NewTruckFormProps) {
  const [licensePlate, setLicensePlate] = useState('');
  const [driver, setDriver] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(licensePlate, driver);
    setLicensePlate('');
    setDriver('');
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Adicionar Novo Caminhão</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="licensePlate">Placa do Caminhão</Label>
          <Input
            id="licensePlate"
            value={licensePlate}
            onChange={(e) => setLicensePlate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="driver">Motorista</Label>
          <Input
            id="driver"
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Adicionar Caminhão
        </Button>
      </form>
    </div>
  );
}
