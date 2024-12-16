import {
  CargoType,
  Delivery,
  Destination,
} from '../../domain/entities/delivery';
import { Driver } from '../../domain/entities/driver';

describe('Delivery', () => {
  const driver = new Driver({
    id: '1',
    name: 'João da Silva',
    licenseNumber: 'ABC123456',
  });

  it('deve criar uma entrega corretamente', () => {
    const delivery = new Delivery({
      id: '1',
      truckId: 'TRUCK1',
      driver,
      type: CargoType.OTHER,
      value: 20000,
      destination: Destination.OTHER,
      date: new Date(),
      insured: false,
    });

    expect(delivery.id).toBe('1');
    expect(delivery.truckId).toBe('TRUCK1');
    expect(delivery.driver).toBe(driver);
    expect(delivery.type).toBe(CargoType.OTHER);
    expect(delivery.value).toBe(20000);
    expect(delivery.destination).toBe(Destination.OTHER);
    expect(delivery.isValuable).toBe(false);
    expect(delivery.isDangerous).toBe(false);
    expect(delivery.insured).toBe(false);
  });

  it('entregas com valores maiores que 30 mil devem receber um indicador de valiosa', () => {
    const delivery = new Delivery({
      id: '2',
      truckId: 'TRUCK2',
      driver,
      type: CargoType.OTHER,
      value: 30001,
      destination: Destination.OTHER,
      date: new Date(),
      insured: false,
    });

    expect(delivery.isValuable).toBeTruthy();
  });

  it('entregas do Tipo eletrônicos devem ter um indicador se tem seguro ou não', () => {
    const delivery = new Delivery({
      id: '6',
      truckId: 'TRUCK6',
      driver,
      type: CargoType.ELECTRONICS,
      value: 10000,
      destination: Destination.OTHER,
      date: new Date(),
      insured: false,
    });

    expect(delivery).toHaveProperty('insured');
  });

  it('entregas do Tipo Combustível devem ter um indicador de perigosa', () => {
    const delivery = new Delivery({
      id: '5',
      truckId: 'TRUCK5',
      driver,
      type: CargoType.FUEL,
      value: 10000,
      destination: Destination.OTHER,
      date: new Date(),
    });

    expect(delivery.isDangerous).toBe(true);
  });

  it('entregas para o Nordeste têm uma taxa de 20% no valor do frete', () => {
    const delivery = new Delivery({
      id: '3',
      truckId: 'TRUCK3',
      driver,
      type: CargoType.OTHER,
      value: 10000,
      destination: Destination.NORTHEAST,
      date: new Date(),
    });

    expect(delivery.value).toEqual(12000);
  });

  it('entregas para Argentina têm uma taxa de 40% no valor do frete;', () => {
    const delivery = new Delivery({
      id: '4',
      truckId: 'TRUCK4',
      driver,
      type: CargoType.OTHER,
      value: 10000,
      destination: Destination.ARGENTINA,
      date: new Date(),
    });

    expect(delivery.value).toBe(14000); // 40% de taxa
  });

  it('entregas para Amazônia têm uma taxa de 30% no valor do frete;', () => {
    const delivery = new Delivery({
      id: '4',
      truckId: 'TRUCK4',
      driver,
      type: CargoType.OTHER,
      value: 10000,
      destination: Destination.AMAZON,
      date: new Date(),
    });

    expect(delivery.value).toBe(13000); // 30% de taxa
  });

  it('deve lançar erro ao tentar criar uma entrega do tipo eletrônico sem especificar se tem seguro ou não', () => {
    expect(() => {
      new Delivery({
        id: '6',
        truckId: 'TRUCK6',
        driver,
        type: CargoType.ELECTRONICS,
        value: 10000,
        destination: Destination.OTHER,
        date: new Date(),
      });
    }).toThrow();
  });
});
