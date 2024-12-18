import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Truck } from '@/types/truck';

interface UpdateTruckModalProps {
  isOpen: boolean;
  onClose: () => void;
  truck: Truck | null;
  onUpdate: (updatedTruck: Truck) => void;
}

export function UpdateTruckModal({
  isOpen,
  onClose,
  truck,
  onUpdate,
}: UpdateTruckModalProps) {
  const [licensePlate, setLicensePlate] = useState('');
  const [driver, setDriver] = useState('');

  useEffect(() => {
    if (truck) {
      setLicensePlate(truck.licensePlate);
      setDriver(truck.driver);
    }
  }, [truck]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!truck) return;

    onUpdate({
      ...truck,
      licensePlate,
      driver,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Caminhão</DialogTitle>
        </DialogHeader>
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
