import { Router } from 'express';
import {
  createLocation,
  getAllLocations,
} from '../controllers/location.controller';

const locationRoutes = Router();

locationRoutes.post('/', createLocation);
locationRoutes.get('/', getAllLocations);

export default locationRoutes;