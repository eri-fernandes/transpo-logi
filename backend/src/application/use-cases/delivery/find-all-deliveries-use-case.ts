import { DeliveryRepository } from '../../../domain/repositories/delivery-repository';
import { DeliveryResponseDTO } from '../../dtos/delivery/delivery-response-dto';

export class FindAllDeliveriesUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute(): Promise<DeliveryResponseDTO[]> {
    const deliveries = await this.deliveryRepository.findAll();

    return deliveries.map((delivery) => ({
      id: delivery.id as string,
      truckId: delivery.truckId,
      driverId: delivery.driverId,
      type: delivery.type,
      value: delivery.value,
      destination: delivery.destination,
      date: delivery.date,
      insured: delivery.insured,
      isValuable: delivery.isValuable,
      isDangerous: delivery.isDangerous,
    }));
  }
}
