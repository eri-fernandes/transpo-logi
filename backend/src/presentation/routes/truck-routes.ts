import { Router } from 'express';
import { TruckController } from '../controllers/truck-controller';
import { createTruckSchema } from '../validations/truck-validation';
import { ValidateSchemaMiddleware } from '../middlewares/validate-schema-middleware';

const truckRoutes = Router();

const truckController = new TruckController();

const validateSchemaMiddleware = new ValidateSchemaMiddleware(
  createTruckSchema
);

truckRoutes.post('/trucks', validateSchemaMiddleware.validate, (req, res) =>
  truckController.create(req, res)
);

export default truckRoutes;
