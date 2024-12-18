import { DriverRepository } from '../../../domain/repositories/driver-repository';
import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { DriverResponseDTO } from '../../dtos/driver/driver-response';

export class FindDriverByIdUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(id: string): Promise<DriverResponseDTO> {
    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new NotFoundException('Motorista não encontrado');
    }

    return driver;
  }
}
