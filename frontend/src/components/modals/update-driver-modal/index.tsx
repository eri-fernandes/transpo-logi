import { useState, useEffect } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Driver } from '@/types/driver';

interface UpdateDriverModalProps {
  isOpen: boolean;
  onClose: () => void;
  driver: Driver | null;
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
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (driver) {
      setName(driver.name);
      setLicenseNumber(driver.licenseNumber);
    }
  }, [driver]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!driver) return;

    onUpdate({
      ...driver,
      name,
      licenseNumber,
    });
  };

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
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus} required>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Disponível">Disponível</SelectItem>
                <SelectItem value="Em Serviço">Em Serviço</SelectItem>
                <SelectItem value="Folga">Folga</SelectItem>
              </SelectContent>
            </Select>
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
