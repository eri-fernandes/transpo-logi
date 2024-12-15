import { CargoType, Delivery, Destination } from './delivery';
import { Driver } from './driver';
import { Truck } from './truck';

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
      driver,
      deliveries: [],
    });

    expect(truck.id).toBe('1');
    expect(truck.licensePlate).toBe('AAA1234');
    expect(truck.driver).toBe(driver);
    expect(truck.deliveries.length).toBe(0);
  });

  it('deve associar uma entrega a um caminhão', () => {
    const delivery = new Delivery({
      id: '1',
      truckId: '1',
      driver,
      type: CargoType.OTHER,
      value: 15000,
      destination: Destination.OTHER,
      date: new Date(),
    });

    const truck = new Truck({
      id: '1',
      licensePlate: 'AAA1234',
      driver,
      deliveries: [delivery],
    });

    expect(truck.deliveries.length).toBe(1);
    expect(truck.deliveries[0]).toBe(delivery);
  });
});
