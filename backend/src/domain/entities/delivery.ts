import { BadRequestException } from '../exceptions/bad-request-exception';

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
export class Delivery {
  public id?: string;
  public truckId: string;
  public driverId: string;
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
    driverId,
    type,
    value,
    destination,
    date,
    insured,
  }: {
    id?: string;
    truckId: string;
    driverId: string;
    type: CargoType;
    value: number;
    destination: Destination;
    date: Date;
    insured?: boolean;
  }) {
    this.id = id;
    this.truckId = truckId;
    this.driverId = driverId;
    this.type = type;
    this.value = value;
    this.destination = destination;
    this.date = date;

    this.insured = insured;
    this.isValuable = this.value > 30000;
    this.isDangerous = this.type === CargoType.FUEL;

    // Se o tipo for eletrônico, precisa ter o indicador de seguro
    if (type === CargoType.ELECTRONICS && insured === undefined) {
      throw new BadRequestException(
        'Entregas do Tipo eletrônicos devem ter um indicador se tem seguro ou não.'
      );
    }

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
