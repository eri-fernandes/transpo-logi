import { TruckRepository } from '../../../domain/repositories/truck-repository';
import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { TruckResponseDTO } from '../../dtos/truck/truck-response';

export class FindTruckByIdUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute(id: string): Promise<TruckResponseDTO> {
    const truck = await this.truckRepository.findById(id);

    if (!truck) {
      throw new NotFoundException('Truck not found');
    }

    return {
      id: truck.id,
      licensePlate: truck.licensePlate,
    };
  }
}
