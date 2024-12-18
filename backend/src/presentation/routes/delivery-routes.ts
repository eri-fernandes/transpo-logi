import { Router } from 'express';
import { DeliveryController } from '../controllers/delivery-controller';
import { createDeliverySchema } from '../validations/delivery-validation';
import { CreateDeliveryUseCase } from '../../application/use-cases/delivery/create-delivery-use-case';
import { FindAllDeliveriesUseCase } from '../../application/use-cases/delivery/find-all-deliveries-use-case';
import { UpdateDeliveryUseCase } from '../../application/use-cases/delivery/update-delivery-use-case';
import { DeleteDeliveryUseCase } from '../../application/use-cases/delivery/delete-delivery-use-case';
import { PrismaDeliveryRepository } from '../../infrastructure/database/prisma-delivery-repository';
import { validateSchema } from '../middlewares/validate-schema-middleware';
import { FindDeliveryByIdUseCase } from '../../application/use-cases/delivery/find-delivery-by-id-use-case';
import { PrismaTruckRepository } from '../../infrastructure/database/prisma-truck-repository';
import { PrismaDriverRepository } from '../../infrastructure/database/prisma-driver-repository';

const deliveryRoutes = Router();

const deliveryRepository = new PrismaDeliveryRepository();
const truckRepository = new PrismaTruckRepository();
const driverRepository = new PrismaDriverRepository();

const deliveryController = new DeliveryController(
  new CreateDeliveryUseCase(
    deliveryRepository,
    truckRepository,
    driverRepository
  ),
  new FindAllDeliveriesUseCase(deliveryRepository),
  new FindDeliveryByIdUseCase(deliveryRepository),
  new UpdateDeliveryUseCase(deliveryRepository),
  new DeleteDeliveryUseCase(deliveryRepository)
);

deliveryRoutes.post(
  '/deliveries',
  validateSchema(createDeliverySchema),
  (req, res, next) => deliveryController.create(req, res, next)
);

deliveryRoutes.get('/deliveries', (req, res, next) =>
  deliveryController.findAll(req, res, next)
);

deliveryRoutes.get('/deliveries/:id', (req, res, next) =>
  deliveryController.findById(req, res, next)
);

deliveryRoutes.put(
  '/deliveries/:id',
  validateSchema(createDeliverySchema),
  (req, res, next) => deliveryController.update(req, res, next)
);

deliveryRoutes.delete('/deliveries/:id', (req, res, next) =>
  deliveryController.delete(req, res, next)
);

export default deliveryRoutes;
