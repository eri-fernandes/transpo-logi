import { TruckRepository } from '../../../domain/repositories/truck-repository';
import { TruckResponseDTO } from '../../dtos/truck/truck-response';

export class FindAllTrucksUseCase {
  constructor(private truckRepository: TruckRepository) {}

  async execute(): Promise<TruckResponseDTO[]> {
    return await this.truckRepository.findAll();
  }
}
