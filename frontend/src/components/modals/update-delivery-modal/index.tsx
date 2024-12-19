import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CargoType, Delivery, Destination } from '@/types/delivery';
import { useEffect, useState } from 'react';

interface UpdateDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  delivery: Delivery | null;
  onUpdate: (updatedDelivery: Delivery) => void;
}

export function UpdateDeliveryModal({
  isOpen,
  delivery,
  onClose,
  onUpdate,
}: UpdateDeliveryModalProps) {
  const [truckId, setTruckId] = useState('');
  const [driverId, setDriverId] = useState('');
  const [type, setType] = useState<CargoType>('OTHER');
  const [value, setValue] = useState<number>(0);
  const [destination, setDestination] = useState<Destination>('OTHER');
  const [date, setDate] = useState<Date>(new Date());
  const [isValuable, setIsValuable] = useState(false);
  const [isDangerous, setIsDangerous] = useState(false);
  const [insured, setInsured] = useState(false);

  useEffect(() => {
    if (delivery) {
      setTruckId(delivery.truckId);
      setDriverId(delivery.driverId);
      setType(delivery.type);
      setValue(delivery.value);
      setDestination(delivery.destination);
      setDate(new Date(delivery.date));
      setIsValuable(delivery.isValuable);
      setIsDangerous(delivery.isDangerous);
      setInsured(delivery.insured || false);
    }
  }, [delivery]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!delivery) return;

    onUpdate({
      ...delivery,
      truckId,
      driverId,
      type,
      value,
      destination,
      date,
      isValuable,
      isDangerous,
      insured,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Entrega</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="truckId">ID do Caminhão</Label>
            <Input
              id="truckId"
              value={truckId}
              onChange={(e) => setTruckId(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="driverId">ID do Motorista</Label>
            <Input
              id="driverId"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Tipo de Carga</Label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as CargoType)}
              required
              className="w-full rounded-md border p-2"
            >
              <option value="ELECTRONICS">Eletrônicos</option>
              <option value="FUEL">Combustível</option>
              <option value="OTHER">Outro</option>
            </select>
          </div>
          <div>
            <Label htmlFor="value">Valor</Label>
            <Input
              id="value"
              type="number"
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              required
            />
          </div>
          <div>
            <Label htmlFor="destination">Destino</Label>
            <select
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value as Destination)}
              required
              className="w-full rounded-md border p-2"
            >
              <option value="NORTHEAST">Nordeste</option>
              <option value="ARGENTINA">Argentina</option>
              <option value="AMAZON">Amazônia</option>
              <option value="OTHER">Outro</option>
            </select>
          </div>
          <div>
            <Label htmlFor="date">Data</Label>
            <Input
              id="date"
              type="date"
              value={date.toISOString().split('T')[0]}
              onChange={(e) => setDate(new Date(e.target.value))}
              required
            />
          </div>
          <div>
            <Label htmlFor="isValuable">Carga Valiosa</Label>
            <Input
              id="isValuable"
              type="checkbox"
              checked={isValuable}
              onChange={(e) => setIsValuable(e.target.checked)}
            />
          </div>
          <div>
            <Label htmlFor="isDangerous">Carga Perigosa</Label>
            <Input
              id="isDangerous"
              type="checkbox"
              checked={isDangerous}
              onChange={(e) => setIsDangerous(e.target.checked)}
            />
          </div>
          <div>
            <Label htmlFor="insured">Seguro</Label>
            <Input
              id="insured"
              type="checkbox"
              checked={insured}
              onChange={(e) => setInsured(e.target.checked)}
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Atualizar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
