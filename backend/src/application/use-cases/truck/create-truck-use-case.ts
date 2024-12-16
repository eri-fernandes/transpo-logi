import { Truck } from '../../../domain/entities/truck';
import { TruckRepository } from '../../../domain/repositories/truck-repository';

export class CreateTruckUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute(data: { id: string; licensePlate: string }): Promise<Truck> {
    const truck = new Truck({
      id: data.id,
      licensePlate: data.licensePlate,
    });
    return this.truckRepository.create(truck);
  }
}
