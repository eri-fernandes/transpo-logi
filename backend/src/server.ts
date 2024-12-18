import express, { Request, Response, NextFunction } from 'express';
import { errorHandler } from './presentation/middlewares/error-handler-middleware';
import truckRoutes from './presentation/routes/truck-routes';
import cors from 'cors';
import driverRoutes from './presentation/routes/driver-routes';
import deliveryRoutes from './presentation/routes/delivery-routes';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/', truckRoutes);
app.use('/', driverRoutes);
app.use('/', deliveryRoutes);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  errorHandler(error, req, res, next);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
