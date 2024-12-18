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

export function NewDeliveryForm() {
  const [destination, setDestination] = useState('');
  const [type, setType] = useState('');
  const [value, setValue] = useState('');
  const [truck, setTruck] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to API)
    console.log('New delivery:', { destination, type, value, truck });
    // Reset form
    setDestination('');
    setType('');
    setValue('');
    setTruck('');
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Adicionar Nova Entrega</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="destination">Destino</Label>
          <Input
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Tipo de Carga</Label>
          <Select value={type} onValueChange={setType} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo de carga" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="eletronicos">Eletrônicos</SelectItem>
              <SelectItem value="alimentos">Alimentos</SelectItem>
              <SelectItem value="combustivel">Combustível</SelectItem>
              <SelectItem value="moveis">Móveis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="value">Valor (R$)</Label>
          <Input
            id="value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="truck">Caminhão</Label>
          <Select value={truck} onValueChange={setTruck} required>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o caminhão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="T001">T001</SelectItem>
              <SelectItem value="T002">T002</SelectItem>
              <SelectItem value="T003">T003</SelectItem>
              <SelectItem value="T004">T004</SelectItem>
              <SelectItem value="T005">T005</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 w-full"
        >
          Adicionar Entrega
        </Button>
      </form>
    </div>
  );
}
