import { Request, Response, NextFunction } from 'express';
import { CreateTruckUseCase } from '../../application/use-cases/truck/create-truck-use-case';
import { DeleteTruckUseCase } from '../../application/use-cases/truck/delete-truck-use-case';
import { UpdateTruckUseCase } from '../../application/use-cases/truck/update-truck-use-case';
import { FindAllTrucksUseCase } from '../../application/use-cases/truck/find-all-trucks-use-case';
import { FindTruckByIdUseCase } from '../../application/use-cases/truck/find-truck-by-id-use-case';

export class TruckController {
  constructor(
    private createTruckUseCase: CreateTruckUseCase,
    private findAllTrucksUseCase: FindAllTrucksUseCase,
    private findTruckByIdUseCase: FindTruckByIdUseCase,
    private updateTruckUseCase: UpdateTruckUseCase,
    private deleteTruckUseCase: DeleteTruckUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { licensePlate } = req.body;
      const truck = await this.createTruckUseCase.execute({ licensePlate });
      res.status(201).json(truck);
    } catch (error) {
      next(error); // Passa o erro para o middleware de erro
    }
  }

  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const trucks = await this.findAllTrucksUseCase.execute();
      res.json(trucks);
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
      const truck = await this.findTruckByIdUseCase.execute(id);
      res.json(truck);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { licensePlate } = req.body;
      const truck = await this.updateTruckUseCase.execute(id, { licensePlate });
      res.json(truck);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteTruckUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
