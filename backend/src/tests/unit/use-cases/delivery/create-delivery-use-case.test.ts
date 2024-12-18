import { CreateDeliveryUseCase } from '../../../../application/use-cases/delivery/create-delivery-use-case';
import { CargoType, Destination } from '../../../../domain/entities/delivery';
import { Driver } from '../../../../domain/entities/driver';
import { InMemoryDeliveryRepository } from '../../../../infrastructure/in-memory/in-memory-delivery-repository';
import { InMemoryDriverRepository } from '../../../../infrastructure/in-memory/in-memory-driver-repository';
import { InMemoryTruckRepository } from '../../../../infrastructure/in-memory/in-memory-truck-repository copy';

describe('CreateDeliveryUseCase', () => {
  let deliveryRepository: InMemoryDeliveryRepository;
  let createDeliveryUseCase: CreateDeliveryUseCase;
  let driverRepository: InMemoryDriverRepository;
  let truckRepository: InMemoryTruckRepository;

  beforeEach(() => {
    truckRepository = new InMemoryTruckRepository();
    driverRepository = new InMemoryDriverRepository();
    deliveryRepository = new InMemoryDeliveryRepository();

    createDeliveryUseCase = new CreateDeliveryUseCase(
      deliveryRepository,
      truckRepository,
      driverRepository
    );
  });

  it('deve criar uma entrega com sucesso', async () => {
    const driver = new Driver({
      id: '1',
      name: 'João da Silva',
      licenseNumber: 'ABC123456',
    });

    await driverRepository.create(driver); // Adiciona o motorista ao repositório

    await truckRepository.create({
      id: '1',
      licensePlate: 'AAA1234',
    });

    const delivery = await createDeliveryUseCase.execute({
      truckId: '1',
      driverId: driver.id as string,
      type: CargoType.OTHER,
      value: 20000,
      destination: Destination.OTHER,
      date: new Date(),
    });

    expect(delivery).toMatchObject({
      truckId: '1',
      driverId: '1',
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

    for (const driver of drivers) {
      await driverRepository.create(driver); // Adiciona os motoristas ao repositório
    }

    await truckRepository.create({
      id: '1',
      licensePlate: 'AAA1234',
    });

    // Criar 4 entregas válidas para o mesmo caminhão
    for (let i = 0; i < 4; i++) {
      await createDeliveryUseCase.execute({
        truckId: '1',
        driverId: drivers[i % 2].id as string,
        type: CargoType.OTHER,
        value: 10000,
        destination: Destination.OTHER,
        date: new Date(),
      });
    }

    // Tentar criar a 5ª entrega para o mesmo caminhão
    await expect(
      createDeliveryUseCase.execute({
        truckId: '1',
        driverId: drivers[0].id as string,
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

    await driverRepository.create(driver); // Adiciona o motorista ao repositório

    await truckRepository.create({
      id: '1',
      licensePlate: 'AAA1234',
    });

    // Criar 2 entregas válidas para o mesmo motorista
    for (let i = 0; i < 2; i++) {
      await createDeliveryUseCase.execute({
        truckId: '1',
        driverId: driver.id as string,
        type: CargoType.OTHER,
        value: 10000,
        destination: Destination.OTHER,
        date: new Date(),
      });
    }

    // Tentar criar a 3ª entrega para o mesmo motorista
    await expect(
      createDeliveryUseCase.execute({
        truckId: '1',
        driverId: driver.id as string,
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

    await driverRepository.create(driver); // Adiciona o motorista ao repositório

    await truckRepository.create({
      id: '1',
      licensePlate: 'AAA1234',
    });

    // Criar 1 entrega no Nordeste para o motorista
    await createDeliveryUseCase.execute({
      truckId: '1',
      driverId: driver.id as string,
      type: CargoType.OTHER,
      value: 10000,
      destination: Destination.NORTHEAST, // Nordeste
      date: new Date(),
    });

    // Tentar criar a 2ª entrega no Nordeste para o mesmo motorista
    await expect(
      createDeliveryUseCase.execute({
        truckId: '1',
        driverId: driver.id as string,
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
