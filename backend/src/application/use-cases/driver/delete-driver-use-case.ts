import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { DriverRepository } from '../../../domain/repositories/driver-repository';

export class DeleteDriverUseCase {
  constructor(private driverRepository: DriverRepository) {}

  async execute(id: string): Promise<void> {
    const driver = await this.driverRepository.findById(id);

    if (!driver) {
      throw new NotFoundException('Motorista não encontrado');
    }

    await this.driverRepository.delete(id);
  }
}
