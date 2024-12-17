import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { TruckRepository } from '../../../domain/repositories/truck-repository';

export class DeleteTruckUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute(id: string): Promise<void> {
    const truck = await this.truckRepository.findById(id);

    if (!truck) {
      throw new NotFoundException('Truck not found');
    }

    await this.truckRepository.delete(id);
  }
}
