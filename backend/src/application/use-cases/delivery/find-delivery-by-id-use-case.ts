import { DeliveryRepository } from '../../../domain/repositories/delivery-repository';
import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { DeliveryResponseDTO } from '../../dtos/delivery/delivery-response';

export class FindDeliveryByIdUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute(id: string): Promise<DeliveryResponseDTO> {
    const delivery = await this.deliveryRepository.findById(id);

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    return delivery;
  }
}
