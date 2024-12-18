import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormEvent, useState } from 'react';

interface NewDriverFormProps {
  onSubmit: (name: string, licenseNumber: string) => void;
}

export function NewDriverForm({ onSubmit }: NewDriverFormProps) {
  const [name, setName] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(name, licenseNumber);
    setName('');
    setLicenseNumber('');
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Adicionar Novo Motorista</h2>
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
          <Label htmlFor="licenseNumber">CNH</Label>
          <Input
            id="license"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Adicionar Motorista
        </Button>
      </form>
    </div>
  );
}
