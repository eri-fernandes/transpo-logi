import { Request, Response, NextFunction } from 'express';
import { CreateDriverUseCase } from '../../application/use-cases/driver/create-driver-use-case';
import { DeleteDriverUseCase } from '../../application/use-cases/driver/delete-driver-use-case';
import { UpdateDriverUseCase } from '../../application/use-cases/driver/update-driver-use-case';
import { FindAllDriversUseCase } from '../../application/use-cases/driver/find-all-drivers-use-case';
import { FindDriverByIdUseCase } from '../../application/use-cases/driver/find-driver-by-id-use-case';

export class DriverController {
  constructor(
    private createDriverUseCase: CreateDriverUseCase,
    private findAllDriversUseCase: FindAllDriversUseCase,
    private findDriverByIdUseCase: FindDriverByIdUseCase,
    private updateDriverUseCase: UpdateDriverUseCase,
    private deleteDriverUseCase: DeleteDriverUseCase
  ) {}

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { name, licenseNumber } = req.body;
      const driver = await this.createDriverUseCase.execute({
        name,
        licenseNumber,
      });
      res.status(201).json(driver);
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
      const drivers = await this.findAllDriversUseCase.execute();
      res.json(drivers);
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
      const driver = await this.findDriverByIdUseCase.execute(id);
      res.json(driver);
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { name, licenseNumber } = req.body;
      const driver = await this.updateDriverUseCase.execute(id, {
        name,
        licenseNumber,
      });
      res.json(driver);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteDriverUseCase.execute(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
