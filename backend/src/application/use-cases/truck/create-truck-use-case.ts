import { Truck } from '../../../domain/entities/truck';
import { TruckRepository } from '../../../domain/repositories/truck-repository';
import { CreateTruckDTO } from '../../dtos/truck/create-truck-dto';
import { TruckResponseDTO } from '../../dtos/truck/truck-response';

export class CreateTruckUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute(data: CreateTruckDTO): Promise<TruckResponseDTO> {
    const truck = new Truck({
      licensePlate: data.licensePlate,
    });

    const truckExists = await this.truckRepository.fincByLicensePlate(
      truck.licensePlate
    );

    if (truckExists) {
      throw new Error('Caminhão ja cadastrado');
    }

    return await this.truckRepository.create({
      licensePlate: data.licensePlate,
    });
  }
}
