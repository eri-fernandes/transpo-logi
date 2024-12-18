import { Router } from 'express';
import { DriverController } from '../controllers/driver-controller';
import { createDriverSchema } from '../validations/driver-validation';
import { CreateDriverUseCase } from '../../application/use-cases/driver/create-driver-use-case';
import { FindAllDriversUseCase } from '../../application/use-cases/driver/find-all-drivers-use-case';
import { UpdateDriverUseCase } from '../../application/use-cases/driver/update-driver-use-case';
import { DeleteDriverUseCase } from '../../application/use-cases/driver/delete-driver-use-case';
import { PrismaDriverRepository } from '../../infrastructure/database/prisma-driver-repository';
import { validateSchema } from '../middlewares/validate-schema-middleware';
import { FindDriverByIdUseCase } from '../../application/use-cases/driver/find-driver-by-id-use-case';

const driverRoutes = Router();

const driverRepository = new PrismaDriverRepository();

const driverController = new DriverController(
  new CreateDriverUseCase(driverRepository),
  new FindAllDriversUseCase(driverRepository),
  new FindDriverByIdUseCase(driverRepository),
  new UpdateDriverUseCase(driverRepository),
  new DeleteDriverUseCase(driverRepository)
);

driverRoutes.post(
  '/drivers',
  validateSchema(createDriverSchema),
  (req, res, next) => driverController.create(req, res, next)
);

driverRoutes.get('/drivers', (req, res, next) =>
  driverController.findAll(req, res, next)
);

driverRoutes.get('/drivers/:id', (req, res, next) =>
  driverController.findById(req, res, next)
);

driverRoutes.put(
  '/drivers/:id',
  validateSchema(createDriverSchema),
  (req, res, next) => driverController.update(req, res, next)
);

driverRoutes.delete('/drivers/:id', (req, res, next) =>
  driverController.delete(req, res, next)
);

export default driverRoutes;
