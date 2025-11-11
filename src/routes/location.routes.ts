// src/routes/location.routes.ts
import { Router } from 'express';
import {
  createLocation,
  getAllLocations,
} from '../controllers/location.controller';

const locationRoutes = Router();

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Retrieve a list of locations
 *     description: Retorna todas as localizações cadastradas no inventário
 *     responses:
 *       200:
 *         description: Lista de locais retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Location'
 */
locationRoutes.get('/', getAllLocations);

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new location
 *     description: Cria uma nova localização no inventário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       201:
 *         description: Local criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 */
locationRoutes.post('/', createLocation);

export default locationRoutes;
