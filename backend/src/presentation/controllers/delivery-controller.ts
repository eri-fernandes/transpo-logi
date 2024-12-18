import { Request, Response, NextFunction } from 'express';
import { CreateDeliveryUseCase } from '../../application/use-cases/delivery/create-delivery-use-case';
import { DeleteDeliveryUseCase } from '../../application/use-cases/delivery/delete-delivery-use-case';
import { UpdateDeliveryUseCase } from '../../application/use-cases/delivery/update-delivery-use-case';
import { FindAllDeliveriesUseCase } from '../../application/use-cases/delivery/find-all-deliveries-use-case';
import { FindDeliveryByIdUseCase } from '../../application/use-cases/delivery/find-delivery-by-id-use-case';

export class DeliveryController {
  constructor(
    private createDeliveryUseCase: CreateDeliveryUseCase,
    private findAllDeliveriesUseCase: FindAllDeliveriesUseCase,
    private findDeliveryByIdUseCase: FindDeliveryByIdUseCase,
    private updateDeliveryUseCase: UpdateDeliveryUseCase,
    private deleteDeliveryUseCase: DeleteDeliveryUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const delivery = await this.createDeliveryUseCase.execute(req.body);
      res.status(201).json(delivery);
    } catch (error) {
      next(error);
    }
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const deliveries = await this.findAllDeliveriesUseCase.execute();
      res.json(deliveries);
    } catch (error) {
      next(error);
    }
  }

  async findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const delivery = await this.findDeliveryByIdUseCase.execute(id);
      res.json(delivery);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const delivery = await this.updateDeliveryUseCase.execute(id, req.body);
      res.json(delivery);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteDeliveryUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
