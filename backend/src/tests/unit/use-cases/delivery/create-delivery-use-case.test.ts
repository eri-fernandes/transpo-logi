import { CreateDeliveryUseCase } from '../../../../application/use-cases/delivery/create-delivery-use-case';
import { CargoType, Destination } from '../../../../domain/entities/delivery';
import { Driver } from '../../../../domain/entities/driver';
import { Truck } from '../../../../domain/entities/truck';
import { InMemoryDeliveryRepository } from '../../../../infrastructure/repositories/delivery/in-memory-delivery-repository';

describe('CreateDeliveryUseCase', () => {
  let deliveryRepository: InMemoryDeliveryRepository;
  let createDeliveryUseCase: CreateDeliveryUseCase;

  beforeEach(() => {
    deliveryRepository = new InMemoryDeliveryRepository();
    createDeliveryUseCase = new CreateDeliveryUseCase(deliveryRepository);
  });

  it('deve criar uma entrega com sucesso', async () => {
    const driver = new Driver({
      id: '1',
      name: 'João da Silva',
      licenseNumber: 'ABC123456',
    });

    const truck = new Truck({
      id: '1',
      licensePlate: 'AAA1234',
      driver,
    });

    const delivery = await createDeliveryUseCase.execute({
      id: '1',
      truck,
      driver,
      type: CargoType.OTHER,
      value: 20000,
      destination: Destination.OTHER,
      date: new Date(),
    });

    expect(delivery).toMatchObject({
      id: '1',
      truck: {
        id: '1',
        licensePlate: 'AAA1234',
        driver,
      },
      driver: {
        id: '1',
        name: 'João da Silva',
        licenseNumber: 'ABC123456',
      },
      type: CargoType.OTHER,
      value: 20000,
      destination: Destination.OTHER,
      isValuable: false,
      isDangerous: false,
    });
  });

  it('não deve permitir mais de 4 entregas para um caminhão no mesmo mês', async () => {
    const drivers = [
      new Driver({ id: '1', name: 'João', licenseNumber: 'ABC123' }),
      new Driver({ id: '2', name: 'Maria', licenseNumber: 'DEF456' }),
    ];

    // Criar 4 entregas válidas para o mesmo caminhão
    for (let i = 0; i < 4; i++) {
      await createDeliveryUseCase.execute({
        id: `${i}`,
        truck: new Truck({ id: 'TRUCK1', licensePlate: 'AAA1234' }),
        driver: drivers[i % 2], // Alterna entre os motoristas
        type: CargoType.OTHER,
        value: 10000,
        destination: Destination.OTHER,
        date: new Date(),
      });
    }

    // Tentar criar a 5ª entrega para o mesmo caminhão
    await expect(
      createDeliveryUseCase.execute({
        id: '5',
        truck: new Truck({ id: 'TRUCK1', licensePlate: 'AAA1234' }),
        driver: new Driver({ id: '5', name: 'Pedro', licenseNumber: 'MNO345' }),
        type: CargoType.OTHER,
        value: 10000,
        destination: Destination.OTHER,
        date: new Date(),
      })
    ).rejects.toThrow(
      'Este caminhão já atingiu o limite de 4 entregas no mês.'
    );
  });

  it('não deve permitir mais de 2 entregas para um motorista no mesmo mês', async () => {
    const driver = new Driver({
      id: '1',
      name: 'João',
      licenseNumber: 'ABC123',
    });

    // Criar 2 entregas válidas para o mesmo motorista
    for (let i = 0; i < 2; i++) {
      await createDeliveryUseCase.execute({
        id: `${i}`,
        truck: new Truck({ id: 'TRUCK1', licensePlate: 'AAA1234' }),
        driver,
        type: CargoType.OTHER,
        value: 10000,
        destination: Destination.OTHER,
        date: new Date(),
      });
    }

    // Tentar criar a 3ª entrega para o mesmo motorista
    await expect(
      createDeliveryUseCase.execute({
        id: '3',
        truck: new Truck({ id: 'TRUCK2', licensePlate: 'BBB5678' }),
        driver,
        type: CargoType.OTHER,
        value: 10000,
        destination: Destination.OTHER,
        date: new Date(),
      })
    ).rejects.toThrow(
      'Este motorista já atingiu o limite de 2 entregas no mês.'
    );
  });

  it('não deve permitir mais de 1 entrega para um motorista no Nordeste', async () => {
    const driver = new Driver({
      id: '1',
      name: 'João',
      licenseNumber: 'ABC123',
    });

    // Criar 1 entrega no Nordeste para o motorista
    await createDeliveryUseCase.execute({
      id: '1',
      truck: new Truck({ id: 'TRUCK1', licensePlate: 'AAA1234' }),
      driver,
      type: CargoType.OTHER,
      value: 10000,
      destination: Destination.NORTHEAST, // Nordeste
      date: new Date(),
    });

    // Tentar criar a 2ª entrega no Nordeste para o mesmo motorista
    await expect(
      createDeliveryUseCase.execute({
        id: '2',
        truck: new Truck({ id: 'TRUCK2', licensePlate: 'BBB5678' }),
        driver,
        type: CargoType.OTHER,
        value: 10000,
        destination: Destination.NORTHEAST, // Nordeste
        date: new Date(),
      })
    ).rejects.toThrow(
      'Este motorista já realizou uma entrega para o Nordeste.'
    );
  });
});
