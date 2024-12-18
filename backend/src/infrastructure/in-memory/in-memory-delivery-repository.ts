import { Delivery } from '../../domain/entities/delivery';
import { DeliveryRepository } from '../../domain/repositories/delivery-repository';

export class InMemoryDeliveryRepository implements DeliveryRepository {
  private deliveries: Delivery[] = [];

  async create(delivery: Delivery): Promise<Delivery> {
    this.deliveries.push(delivery);
    return delivery;
  }

  async countByTruckAndMonth(truckId: string, date: Date): Promise<number> {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return this.deliveries.filter((delivery) => {
      return (
        delivery.truckId === truckId &&
        delivery.date >= firstDayOfMonth &&
        delivery.date < lastDayOfMonth
      );
    }).length;
  }

  async countByDriverAndMonth(driverId: string, date: Date): Promise<number> {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    return this.deliveries.filter((delivery) => {
      return (
        delivery.driverId === driverId &&
        delivery.date >= firstDayOfMonth &&
        delivery.date < lastDayOfMonth
      );
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

  async update(id: string, delivery: Delivery): Promise<Delivery> {
    const index = this.deliveries.findIndex((d) => d.id === id);
    this.deliveries[index] = delivery;
    return delivery;
  }
}
