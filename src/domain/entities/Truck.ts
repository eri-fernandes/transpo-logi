import { Delivery } from "./delivery";
import { Driver } from "./driver";

export class Truck {
  public id: string;
  public licensePlate: string;
  public driver: Driver;
  public deliveries: Delivery[];

  constructor({
    id,
    licensePlate,
    driver,
    deliveries,
  }: {
    id: string;
    licensePlate: string;
    driver: Driver;
    deliveries: Delivery[];
  }) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.driver = driver;
    this.deliveries = deliveries;
  }
}
