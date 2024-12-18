import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { DeliveryRepository } from '../../../domain/repositories/delivery-repository';

export class DeleteDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute(id: string): Promise<void> {
    const delivery = await this.deliveryRepository.findById(id);

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    await this.deliveryRepository.delete(id);
  }
}
