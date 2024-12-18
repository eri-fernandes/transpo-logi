import { Driver } from '../../../domain/entities/driver';
import { ConflictException } from '../../../domain/exceptions/conflict-exception';
import { DriverRepository } from '../../../domain/repositories/driver-repository';
import { CreateDriverDTO } from '../../dtos/driver/create-driver-dto';
import { DriverResponseDTO } from '../../dtos/driver/driver-response';

export class CreateDriverUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(data: CreateDriverDTO): Promise<DriverResponseDTO> {
    const driver = new Driver({
      name: data.name,
      licenseNumber: data.licenseNumber,
    });

    const driverExists = await this.driverRepository.findByLicenseNumber(
      driver.licenseNumber
    );

    if (driverExists) {
      throw new ConflictException('Motorista já cadastrado');
    }

    return await this.driverRepository.create(driver);
  }
}
