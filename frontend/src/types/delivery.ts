export enum CargoType {
  ELECTRONICS = 'ELECTRONICS',
  FUEL = 'FUEL',
  OTHER = 'OTHER',
}

export enum Destination {
  NORTHEAST = 'NORTHEAST',
  ARGENTINA = 'ARGENTINA',
  AMAZON = 'AMAZON',
  OTHER = 'OTHER',
}

export interface Delivery {
  id?: string;
  truckId: string;
  driverId: string;
  type: CargoType;
  value: number;
  destination: Destination;
  date: Date;
  isValuable: boolean;
  isDangerous: boolean;
  insured?: boolean;
}
