import { Request, Response } from 'express';
import { CreateTruckUseCase } from '../../application/use-cases/truck/create-truck-use-case';
import { PrismaTruckRepository } from '../../infrastructure/database/prisma-truck-repository';

const truckRepository = new PrismaTruckRepository();
const createTruckUseCase = new CreateTruckUseCase(truckRepository);

export class TruckController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { licensePlate } = req.body;

      const truck = await createTruckUseCase.execute({ licensePlate });

      res.status(201).json(truck);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Ocorreu um erro desconhecido.' });
      }
    }
  }
}
