import express from 'express';
import truckRoutes from './presentation/routes/truck-routes';

const app = express();

app.use(express.json());

app.use('/', truckRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
