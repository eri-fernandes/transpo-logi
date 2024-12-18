import { CreateTruckUseCase } from '../../../../application/use-cases/truck/create-truck-use-case';
import { InMemoryTruckRepository } from '../../../../infrastructure/in-memory/in-memory-truck-repository copy';

describe('CreateTruckUseCase', () => {
  it('deve criar um caminhão corretamente', async () => {
    const truckRepository = new InMemoryTruckRepository();
    const createTruckUseCase = new CreateTruckUseCase(truckRepository);

    const truckData = {
      licensePlate: 'AAA1234',
    };

    const truck = await createTruckUseCase.execute(truckData);

    expect(truck.licensePlate).toBe('AAA1234');
  });
});
