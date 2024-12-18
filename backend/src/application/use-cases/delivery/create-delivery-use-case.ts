import { Delivery, Destination } from '../../../domain/entities/delivery';
import { NotFoundException } from '../../../domain/exceptions/not-found-exception';
import { DeliveryRepository } from '../../../domain/repositories/delivery-repository';
import { DriverRepository } from '../../../domain/repositories/driver-repository';
import { TruckRepository } from '../../../domain/repositories/truck-repository';
import { CreateDeliveryDTO } from '../../dtos/delivery/create-delivery-dto';
import { DeliveryResponseDTO } from '../../dtos/delivery/delivery-response-dto';

export class CreateDeliveryUseCase {
  constructor(
    private readonly deliveryRepository: DeliveryRepository,
    private readonly truckRepository: TruckRepository,
    private readonly driverRepository: DriverRepository
  ) {}

  async execute(data: CreateDeliveryDTO): Promise<DeliveryResponseDTO> {
    const truckExists = await this.truckRepository.findById(data.truckId);

    if (!truckExists) {
      throw new NotFoundException('Caminhão não encontrado');
    }

    const driverExists = await this.driverRepository.findById(data.driverId);

    if (!driverExists) {
      throw new NotFoundException('Motorista nao encontrado');
    }

    const deliveriesForTruck =
      await this.deliveryRepository.countByTruckAndMonth(
        data.truckId,
        new Date(data.date)
      );

    if (deliveriesForTruck >= 4) {
      throw new Error(
        'Este caminhão já atingiu o limite de 4 entregas no mês.'
      );
    }

    const deliveriesForDriver =
      await this.deliveryRepository.countByDriverAndMonth(
        data.driverId,
        new Date(data.date)
      );

    if (deliveriesForDriver >= 2) {
      throw new Error(
        'Este motorista já atingiu o limite de 2 entregas no mês.'
      );
    }

    if (data.destination === Destination.NORTHEAST) {
      const deliveriesToNortheast =
        await this.deliveryRepository.countByDriverAndRegion(
          data.driverId,
          Destination.NORTHEAST
        );

      if (deliveriesToNortheast > 0) {
        throw new Error(
          'Este motorista já realizou uma entrega para o Nordeste.'
        );
      }
    }

    const delivery = new Delivery({
      truckId: data.truckId,
      type: data.type,
      value: data.value,
      destination: data.destination,
      date: data.date,
      insured: data.insured,
      driverId: data.driverId,
    });

    const createdDelivery = await this.deliveryRepository.create(delivery);

    return {
      id: createdDelivery.id as string,
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
