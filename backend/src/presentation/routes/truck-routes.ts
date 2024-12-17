import { Router } from 'express';
import { TruckController } from '../controllers/truck-controller';
import { createTruckSchema } from '../validations/truck-validation';
import { CreateTruckUseCase } from '../../application/use-cases/truck/create-truck-use-case';
import { FindAllTrucksUseCase } from '../../application/use-cases/truck/find-all-trucks-use-case';
import { UpdateTruckUseCase } from '../../application/use-cases/truck/update-truck-use-case';
import { DeleteTruckUseCase } from '../../application/use-cases/truck/delete-truck-use-case';
import { PrismaTruckRepository } from '../../infrastructure/database/prisma-truck-repository';
import { validateSchema } from '../middlewares/validate-schema-middleware';
import { FindTruckByIdUseCase } from '../../application/use-cases/truck/find-truck-by-id-use-case';

const truckRoutes = Router();

const truckRepository = new PrismaTruckRepository();

const truckController = new TruckController(
  new CreateTruckUseCase(truckRepository),
  new FindAllTrucksUseCase(truckRepository),
  new FindTruckByIdUseCase(truckRepository),
  new UpdateTruckUseCase(truckRepository),
  new DeleteTruckUseCase(truckRepository)
);

truckRoutes.post(
  '/trucks',
  validateSchema(createTruckSchema),
  (req, res, next) => truckController.create(req, res, next)
);

truckRoutes.get('/trucks', (req, res, next) =>
  truckController.findAll(req, res, next)
);

truckRoutes.get('/trucks/:id', (req, res, next) =>
  truckController.findById(req, res, next)
);

truckRoutes.put(
  '/trucks/:id',
  validateSchema(createTruckSchema),
  (req, res, next) => truckController.update(req, res, next)
);

truckRoutes.delete('/trucks/:id', (req, res, next) =>
  truckController.delete(req, res, next)
);

export default truckRoutes;
