import { CreateTruckUseCase } from '../../../../application/use-cases/truck/create-truck-use-case';
import { InMemoryTruckRepository } from '../../../../infrastructure/in-memory/in-memory-truck-repository';

describe('CreateTruckUseCase', () => {
  it('deve criar um caminhão corretamente', async () => {
    const truckRepository = new InMemoryTruckRepository();
    const createTruckUseCase = new CreateTruckUseCase(truckRepository);

    const truckData = {
      id: '1',
      licensePlate: 'AAA1234',
    };

    const truck = await createTruckUseCase.execute(truckData);

    expect(truck.id).toBe('1');
    expect(truck.licensePlate).toBe('AAA1234');
  });
});
