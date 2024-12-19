import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Driver } from '@/types/driver';

interface NewTruckFormProps {
  onSubmit: (licensePlate: string, driver: string) => void;
  drivers: Driver[]; // Receba os motoristas como prop
}

export default function NewTruckForm({ onSubmit, drivers }: NewTruckFormProps) {
  const [licensePlate, setLicensePlate] = useState('');
  const [driver, setDriver] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driver) {
      alert('Por favor, selecione um motorista.');
      return;
    }
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
          <Select onValueChange={(value) => setDriver(value)} required>
            <SelectTrigger id="driver">
              <SelectValue placeholder="Selecione um motorista" />
            </SelectTrigger>
            <SelectContent>
              {drivers.map((driver) => (
                <SelectItem key={driver.id} value={driver.id}>
                  {driver.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
