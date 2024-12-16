import { Truck } from '../../../domain/entities/truck';
import { TruckRepository } from '../../../domain/repositories/truck-repository';
import { CreateTruckDTO } from '../../dtos/truck/create-truck-dto';
import { TruckResponseDTO } from '../../dtos/truck/truck-response';

export class CreateTruckUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute(data: CreateTruckDTO): Promise<TruckResponseDTO> {
    const truck = new Truck({
      id: data.id,
      licensePlate: data.licensePlate,
    });

    return this.truckRepository.create({
      id: truck.id,
      licensePlate: truck.licensePlate,
      driverId: truck.driverId,
      deliveries: truck.deliveries,
    });
  }
}
