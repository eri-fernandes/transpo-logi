import { Delivery } from '../../../domain/entities/delivery';
import { DeliveryRepository } from '../../../domain/repositories/delivery-repository';
import { CreateDeliveryDTO } from '../../dtos/delivery/create-delivery-dto';
import { DeliveryResponseDTO } from '../../dtos/delivery/delivery-response-dto';

export class CreateDeliveryUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute(data: CreateDeliveryDTO): Promise<DeliveryResponseDTO> {
    const currentMonth = new Date().getMonth() + 1;

    // Verificar entregas do caminhão
    const deliveriesForTruck =
      await this.deliveryRepository.countByTruckAndMonth(
        data.truck.id,
        currentMonth
      );

    if (deliveriesForTruck >= 4) {
      throw new Error(
        'Este caminhão já atingiu o limite de 4 entregas no mês.'
      );
    }

    // Verificar entregas do motorista
    const deliveriesForDriver =
      await this.deliveryRepository.countByDriverAndMonth(
        data.driver.id,
        currentMonth
      );

    if (deliveriesForDriver >= 2) {
      throw new Error(
        'Este motorista já atingiu o limite de 2 entregas no mês.'
      );
    }

    // Verificar entregas para o Nordeste
    if (data.destination === 'northeast') {
      const deliveriesToNortheast =
        await this.deliveryRepository.countByDriverAndRegion(
          data.driver.id,
          'northeast'
        );

      if (deliveriesToNortheast > 0) {
        throw new Error(
          'Este motorista já realizou uma entrega para o Nordeste.'
        );
      }
    }

    // Criar entrega
    const delivery = new Delivery({
      id: data.id,
      truckId: data.truck.id,
      type: data.type,
      value: data.value,
      destination: data.destination,
      date: data.date,
      insured: data.insured,
      driverId: data.driver.id,
    });

    const createdDelivery = await this.deliveryRepository.create(delivery);

    return {
      id: createdDelivery.id,
      truckId: createdDelivery.truckId,
      driverId: createdDelivery.driverId,
      type: createdDelivery.type,
      value: createdDelivery.value,
      destination: createdDelivery.destination,
      date: createdDelivery.date,
      insured: createdDelivery.insured,
      isValuable: createdDelivery.isValuable,
      isDangerous: createdDelivery.isDangerous,
    };
  }
}
