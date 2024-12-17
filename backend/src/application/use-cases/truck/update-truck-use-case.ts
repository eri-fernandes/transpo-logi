import { TruckRepository } from '../../../domain/repositories/truck-repository';
import { Truck } from '../../../domain/entities/truck';
import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { TruckResponseDTO } from '../../dtos/truck/truck-response';

export class UpdateTruckUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute(
    id: string,
    data: { licensePlate: string }
  ): Promise<TruckResponseDTO> {
    const existingTruck = await this.truckRepository.findById(id);

    if (!existingTruck) {
      throw new NotFoundException('Truck not found');
    }

    const truck = new Truck({ licensePlate: data.licensePlate });
    const updatedTruck = await this.truckRepository.update(id, truck);

    return {
      id: updatedTruck.id,
      licensePlate: updatedTruck.licensePlate,
    };
  }
}
