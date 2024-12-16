import { Delivery } from '../../domain/entities/delivery';
import { DeliveryRepository } from '../../domain/repositories/delivery-repository';

export class InMemoryDeliveryRepository implements DeliveryRepository {
  private deliveries: Delivery[] = [];

  async create(delivery: Delivery): Promise<Delivery> {
    this.deliveries.push(delivery);
    return delivery;
  }

  async countByTruckAndMonth(truckId: string, month: number): Promise<number> {
    return this.deliveries.filter((delivery) => {
      const deliveryMonth = delivery.date.getMonth() + 1;
      return delivery.truckId === truckId && deliveryMonth === month;
    }).length;
  }

  async countByDriverAndMonth(
    driverId: string,
    month: number
  ): Promise<number> {
    return this.deliveries.filter((delivery) => {
      const deliveryMonth = delivery.date.getMonth() + 1;
      return delivery.driverId === driverId && deliveryMonth === month;
    }).length;
  }

  async countByDriverAndRegion(
    driverId: string,
    region: string
  ): Promise<number> {
    return this.deliveries.filter((delivery) => {
      return delivery.driverId === driverId && delivery.destination === region;
    }).length;
  }

  async findAll(): Promise<Delivery[]> {
    return this.deliveries;
  }

  async findById(id: string): Promise<Delivery | null> {
    return this.deliveries.find((delivery) => delivery.id === id) || null;
  }

  async delete(id: string): Promise<void> {
    this.deliveries = this.deliveries.filter((delivery) => delivery.id !== id);
  }
}
