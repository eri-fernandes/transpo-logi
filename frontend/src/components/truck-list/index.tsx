import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const trucks = [
  {
    id: 1,
    number: 'T001',
    status: 'Em Entrega',
    driver: 'João Silva',
    lastMaintenance: '2023-05-15',
  },
  {
    id: 2,
    number: 'T002',
    status: 'Disponível',
    driver: 'Maria Santos',
    lastMaintenance: '2023-06-01',
  },
  {
    id: 3,
    number: 'T003',
    status: 'Manutenção',
    driver: 'Carlos Oliveira',
    lastMaintenance: '2023-06-10',
  },
  {
    id: 4,
    number: 'T004',
    status: 'Em Entrega',
    driver: 'Ana Rodrigues',
    lastMaintenance: '2023-05-20',
  },
  {
    id: 5,
    number: 'T005',
    status: 'Disponível',
    driver: 'Pedro Almeida',
    lastMaintenance: '2023-06-05',
  },
];

export function TruckList() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Lista de Caminhões</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Motorista</TableHead>
              <TableHead>Última Manutenção</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {trucks.map((truck) => (
              <TableRow key={truck.id}>
                <TableCell className="font-medium">{truck.number}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      truck.status === 'Disponível'
                        ? 'success'
                        : truck.status === 'Em Entrega'
                          ? 'warning'
                          : 'destructive'
                    }
                  >
                    {truck.status}
                  </Badge>
                </TableCell>
                <TableCell>{truck.driver}</TableCell>
                <TableCell>{truck.lastMaintenance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
