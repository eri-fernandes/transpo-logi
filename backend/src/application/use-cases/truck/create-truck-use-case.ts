import { Truck } from '../../../domain/entities/truck';
import { ConflictException } from '../../../domain/exceptions/conflict-exception';
import { TruckRepository } from '../../../domain/repositories/truck-repository';
import { CreateTruckDTO } from '../../dtos/truck/create-truck-dto';
import { TruckResponseDTO } from '../../dtos/truck/truck-response';

export class CreateTruckUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute(data: CreateTruckDTO): Promise<TruckResponseDTO> {
    const truck = new Truck({
      licensePlate: data.licensePlate,
    });

    const truckExists = await this.truckRepository.findByLicensePlate(
      truck.licensePlate
    );

    if (truckExists) {
      throw new ConflictException('Truck already exists');
    }

    return await this.truckRepository.create({
      licensePlate: data.licensePlate,
    });
  }
}
