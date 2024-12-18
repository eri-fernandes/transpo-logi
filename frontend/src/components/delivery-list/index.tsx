import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const deliveries = [
  {
    id: 1,
    destination: 'São Paulo',
    type: 'Eletrônicos',
    value: 25000,
    status: 'Em Trânsito',
    truck: 'T001',
  },
  {
    id: 2,
    destination: 'Rio de Janeiro',
    type: 'Alimentos',
    value: 15000,
    status: 'Entregue',
    truck: 'T003',
  },
  {
    id: 3,
    destination: 'Belo Horizonte',
    type: 'Combustível',
    value: 50000,
    status: 'Em Trânsito',
    truck: 'T002',
  },
  {
    id: 4,
    destination: 'Recife',
    type: 'Eletrônicos',
    value: 35000,
    status: 'Agendada',
    truck: 'T004',
  },
  {
    id: 5,
    destination: 'Porto Alegre',
    type: 'Móveis',
    value: 20000,
    status: 'Em Trânsito',
    truck: 'T005',
  },
];

export default function DeliveryList() {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h2 className="mb-4 text-xl font-bold">Lista de Entregas</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Destino</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Caminhão</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deliveries.map((delivery) => (
              <TableRow key={delivery.id}>
                <TableCell>{delivery.destination}</TableCell>
                <TableCell>{delivery.type}</TableCell>
                <TableCell>R$ {delivery.value.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      delivery.status === 'Entregue'
                        ? 'success'
                        : delivery.status === 'Em Trânsito'
                          ? 'warning'
                          : 'default'
                    }
                  >
                    {delivery.status}
                  </Badge>
                </TableCell>
                <TableCell>{delivery.truck}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
