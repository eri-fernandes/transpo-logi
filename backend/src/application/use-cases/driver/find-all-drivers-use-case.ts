import { DriverRepository } from '../../../domain/repositories/driver-repository';
import { DriverResponseDTO } from '../../dtos/driver/driver-response';

export class FindAllDriversUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(): Promise<DriverResponseDTO[]> {
    return await this.driverRepository.findAll();
  }
}
