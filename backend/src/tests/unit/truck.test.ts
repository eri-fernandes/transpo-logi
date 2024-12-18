import {
  CargoType,
  Delivery,
  Destination,
} from '../../domain/entities/delivery';
import { Driver } from '../../domain/entities/driver';
import { Truck } from '../../domain/entities/truck';

describe('Truck', () => {
  const driver = new Driver({
    id: '1',
    name: 'João da Silva',
    licenseNumber: 'ABC123456',
  });

  it('deve criar um caminhão corretamente', () => {
    const truck = new Truck({
      id: '1',
      licensePlate: 'AAA1234',
      driverId: driver.id,
    });

    expect(truck.id).toBe('1');
    expect(truck.licensePlate).toBe('AAA1234');
  });

  it('deve associar uma entrega a um caminhão', () => {
    const driver = new Driver({
      id: '1',
      name: 'João da Silva',
      licenseNumber: 'ABC123456',
    });

    const truck = new Truck({
      id: '1',
      licensePlate: 'AAA1234',
      driverId: driver.id,
    });

    const delivery = new Delivery({
      id: '1',
      truckId: '1',
      driverId: driver.id as string,
      type: CargoType.OTHER,
      value: 15000,
      destination: Destination.OTHER,
      date: new Date(),
    });

    truck.deliveries = [delivery?.id as string];

    expect(truck.deliveries?.length).toBe(1);
    expect(truck.deliveries?.[0]).toBe(delivery.id);
  });
});
