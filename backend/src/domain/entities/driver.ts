export class Driver {
  public id: string;
  public name: string;
  public licenseNumber: string;

  constructor({
    id,
    name,
    licenseNumber,
  }: {
    id: string;
    name: string;
    licenseNumber: string;
  }) {
    this.id = id;
    this.name = name;
    this.licenseNumber = licenseNumber;
  }
}
