import { Truck, Package, AlertTriangle, DollarSign } from 'lucide-react';
import { SummaryCard } from './summary-card';

export default function Summary() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Total de Caminhões"
        value="15"
        icon={<Truck className="text-primary h-8 w-8" />}
      />

      <SummaryCard
        title="Entregas em Andamento"
        value="42"
        icon={<Package className="text-primary h-8 w-8" />}
      />

      <SummaryCard
        title="Alertas"
        value="3"
        icon={<AlertTriangle className="h-8 w-8 text-yellow-500" />}
      />

      <SummaryCard
        title="Valor Total de Entregas"
        value="R$ 1.5M"
        icon={<DollarSign className="h-8 w-8 text-green-500" />}
      />
    </div>
  );
}
