export class Driver {
  public id: string;
  public name: string;
  public licenseNumber: string;
  public truckId?: string;

  constructor({
    id,
    name,
    licenseNumber,
    truckId,
  }: {
    id: string;
    name: string;
    licenseNumber: string;
    truckId?: string;
  }) {
    this.id = id;
    this.name = name;
    this.licenseNumber = licenseNumber;
    this.truckId = truckId;
  }
}
