import { DriverRepository } from '../../../domain/repositories/driver-repository';
import { Driver } from '../../../domain/entities/driver';
import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { DriverResponseDTO } from '../../dtos/driver/driver-response';

export class UpdateDriverUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(
    id: string,
    data: { name: string; licenseNumber: string }
  ): Promise<DriverResponseDTO> {
    const existingDriver = await this.driverRepository.findById(id);

    if (!existingDriver) {
      throw new NotFoundException('Motorista não encontrado');
    }

    const driver = new Driver({
      name: data.name,
      licenseNumber: data.licenseNumber,
    });

    return await this.driverRepository.update(id, driver);
  }
}
