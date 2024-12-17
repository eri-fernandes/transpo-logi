export class Truck {
  public id?: string;
  public licensePlate: string;
  public driverId?: string;
  public deliveries?: string[];

  constructor({
    id,
    licensePlate,
    driverId,
    deliveries,
  }: {
    id?: string;
    licensePlate: string;
    driverId?: string;
    deliveries?: string[];
  }) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.driverId = driverId;
    this.deliveries = deliveries;
  }
}
