interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

export function SummaryCard({ title, value, icon }: SummaryCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-primary text-2xl font-bold">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
