import { Delivery } from '../../../domain/entities/delivery';
import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { DeliveryRepository } from '../../../domain/repositories/delivery-repository';
import { CreateDeliveryDTO } from '../../dtos/delivery/create-delivery-dto';
import { DeliveryResponseDTO } from '../../dtos/delivery/delivery-response-dto';

export class UpdateDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute(
    id: string,
    data: CreateDeliveryDTO
  ): Promise<DeliveryResponseDTO> {
    const existingDelivery = await this.deliveryRepository.findById(id);

    if (!existingDelivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    const delivery = new Delivery({
      id,
      truckId: data.truckId,
      driverId: data.driverId,
      type: data.type,
      value: data.value,
      destination: data.destination,
      date: data.date,
      insured: data.insured,
    });

    const uppdatedDelivery = await this.deliveryRepository.update(id, delivery);

    return {
      id: uppdatedDelivery.id as string,
      truckId: uppdatedDelivery.truckId,
      driverId: uppdatedDelivery.driverId,
      type: uppdatedDelivery.type,
      value: uppdatedDelivery.value,
      destination: uppdatedDelivery.destination,
      date: uppdatedDelivery.date,
      insured: uppdatedDelivery.insured,
      isValuable: uppdatedDelivery.isValuable,
      isDangerous: uppdatedDelivery.isDangerous,
    };
  }
}
