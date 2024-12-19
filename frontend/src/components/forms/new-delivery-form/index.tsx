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
import { CargoType, Delivery, Destination } from '@/types/delivery';
import { Truck } from '@/types/truck';
import { Driver } from '@/types/driver';

interface NewDeliveryFormProps {
  onSubmit: (delivery: Delivery) => void;
  trucks: Truck[];
  drivers: Driver[];
}

export function NewDeliveryForm({
  onSubmit,
  trucks,
  drivers,
}: NewDeliveryFormProps) {
  const [delivery, setDelivery] = useState<Delivery>({
    truckId: '',
    driverId: '',
    type: 'OTHER' as CargoType,
    value: 0,
    destination: 'OTHER' as Destination,
    date: new Date(),
    isValuable: false,
    isDangerous: false,
    insured: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(delivery);
    setDelivery({ ...delivery, truckId: '', driverId: '' });
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Adicionar Nova Entrega</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select para Caminhão */}
        <div>
          <Label htmlFor="truckId">Caminhão</Label>
          <Select
            onValueChange={(value) =>
              setDelivery({ ...delivery, truckId: value })
            }
            required
          >
            <SelectTrigger id="truckId">
              <SelectValue placeholder="Selecione um caminhão" />
            </SelectTrigger>
            <SelectContent>
              {trucks.map((truck) => (
                <SelectItem key={truck.id} value={String(truck.id)}>
                  {truck.licensePlate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select para Motorista */}
        <div>
          <Label htmlFor="driverId">Motorista</Label>
          <Select
            onValueChange={(value) =>
              setDelivery({ ...delivery, driverId: value })
            }
            required
          >
            <SelectTrigger id="driverId">
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

        {/* Tipo de Carga */}
        <div>
          <Label htmlFor="type">Tipo de Carga</Label>
          <Select
            onValueChange={(value) =>
              setDelivery({ ...delivery, type: value as CargoType })
            }
            required
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Selecione o tipo de carga" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ELECTRONICS">Eletrônicos</SelectItem>
              <SelectItem value="FUEL">Combustível</SelectItem>
              <SelectItem value="OTHER">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Outros Campos */}
        <div>
          <Label htmlFor="value">Valor</Label>
          <Input
            id="value"
            type="number"
            value={delivery.value}
            onChange={(e) =>
              setDelivery({ ...delivery, value: parseFloat(e.target.value) })
            }
            required
          />
        </div>
        <div>
          <Label htmlFor="destination">Destino</Label>
          <Select
            onValueChange={(value) =>
              setDelivery({ ...delivery, destination: value as Destination })
            }
            required
          >
            <SelectTrigger id="destination">
              <SelectValue placeholder="Selecione o destino" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="NORTHEAST">Nordeste</SelectItem>
              <SelectItem value="ARGENTINA">Argentina</SelectItem>
              <SelectItem value="AMAZON">Amazônia</SelectItem>
              <SelectItem value="OTHER">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            value={delivery.date.toISOString().split('T')[0]}
            onChange={(e) =>
              setDelivery({ ...delivery, date: new Date(e.target.value) })
            }
            required
          />
        </div>

        {/* Campos Booleanos */}
        <div className="flex items-center space-x-2">
          <Input
            id="isValuable"
            type="checkbox"
            checked={delivery.isValuable}
            onChange={(e) =>
              setDelivery({ ...delivery, isValuable: e.target.checked })
            }
          />
          <Label htmlFor="isValuable">Carga Valiosa</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            id="isDangerous"
            type="checkbox"
            checked={delivery.isDangerous}
            onChange={(e) =>
              setDelivery({ ...delivery, isDangerous: e.target.checked })
            }
          />
          <Label htmlFor="isDangerous">Carga Perigosa</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            id="insured"
            type="checkbox"
            checked={delivery.insured}
            onChange={(e) =>
              setDelivery({ ...delivery, insured: e.target.checked })
            }
          />
          <Label htmlFor="insured">Seguro</Label>
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Adicionar Entrega
        </Button>
      </form>
    </div>
  );
}
