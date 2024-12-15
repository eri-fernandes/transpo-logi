import { Driver } from "./driver";

export enum CargoType {
  ELECTRONICS = "electronics",
  FUEL = "fuel",
  OTHER = "other",
}

export enum Destination {
  NORTHEAST = "northeast",
  ARGENTINA = "argentina",
  AMAZON = "amazon",
  OTHER = "other",
}

export class Delivery {
  public id: string;
  public truckId: string;
  public driver: Driver;
  public type: CargoType;
  public value: number;
  public destination: Destination;
  public date: Date;
  public isValuable: boolean;
  public isDangerous: boolean;
  public insured?: boolean;

  constructor({
    id,
    truckId,
    driver,
    type,
    value,
    destination,
    date,
    insured,
  }: {
    id: string;
    truckId: string;
    driver: Driver;
    type: CargoType;
    value: number;
    destination: Destination;
    date: Date;
    insured?: boolean;
  }) {
    this.id = id;
    this.truckId = truckId;
    this.driver = driver;
    this.type = type;
    this.value = value;
    this.destination = destination;
    this.date = date;

    this.isValuable = this.value > 30000;
    this.isDangerous = this.type === CargoType.FUEL;

    // Se o tipo for eletrônico, precisa ter o indicador de seguro
    if (type === CargoType.ELECTRONICS && insured === undefined) {
      throw new Error(
        "Entregas do Tipo eletrônicos devem ter um indicador se tem seguro ou não."
      );
    }

    this.insured = insured;

    if (destination === Destination.NORTHEAST && value > 0) {
      this.value *= 1.2; // Taxa de 20%
    }

    if (destination === Destination.ARGENTINA && value > 0) {
      this.value *= 1.4; // Taxa de 40%
    }

    if (destination === Destination.AMAZON && value > 0) {
      this.value *= 1.3; // Taxa de 30%
    }
  }
}
