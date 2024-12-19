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
import { Driver } from '@/types/driver';
import { useEffect, useState } from 'react';

interface UpdateDriverModalProps {
  isOpen: boolean;
  driver: Driver | null;
  onClose: () => void;
  onUpdate: (updatedDriver: Driver) => void;
}

export function UpdateDriverModal({
  isOpen,
  onClose,
  driver,
  onUpdate,
}: UpdateDriverModalProps) {
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  useEffect(() => {
    if (driver) {
      setName(driver.name);
      setLicenseNumber(driver.licenseNumber);
    }
  }, [driver]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!driver) return;

    onUpdate({
      ...driver,
      name,
      licenseNumber,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Motorista</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="license">CNH</Label>
            <Input
              id="license"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
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
