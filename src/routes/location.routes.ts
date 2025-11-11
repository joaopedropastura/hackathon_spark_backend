import { Router } from "express";
import {
  createLocation,
  getAllLocations,
  getById,
  updateLocation,
  deleteLocation,
} from "../controllers/location.controller";
import 'dotenv/config';

const locationRoutes = Router();

/**
 * @swagger
 * /locations:
 *   get:
 *     tags: [Locations]  
 *     summary: Retrieve a list of locations
 *     description: Retorna todas as localizações cadastradas no inventário
 *     parameters:
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filtra pelo nome da cidade
 *       - in: query
 *         name: unity
 *         schema:
 *           type: string
 *         description: Filtra pelo código da unidade
 *       - in: query
 *         name: state
 *         schema:
 *           type: string
 *         description: Filtra pelo estado
 *       - in: query
 *         name: street
 *         schema:
 *           type: string
 *         description: Filtra pelo nome da rua
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
locationRoutes.get("/", getAllLocations);

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     tags: [Locations]
 *     summary: Get a location by ID
 *     description: Retorna uma localização específica pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da localização
 *     responses:
 *       200:
 *         description: Localização encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Location'
 *       404:
 *         description: Localização não encontrada
 */
locationRoutes.get("/:id", getById);

/**
 * @swagger
 * /locations:
 *   post:
 *     tags: [Locations]
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
 *       400:
 *         description: Campos obrigatórios ausentes
 *       409:
 *         description: Local já existe com a mesma cidade e unidade
 */
locationRoutes.post("/", createLocation);

/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     tags: [Locations]
 *     summary: Update a location
 *     description: Atualiza completamente os dados de uma localização
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da localização
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Location'
 *     responses:
 *       204:
 *         description: Localização atualizada com sucesso (sem conteúdo)
 *       400:
 *         description: Dados inválidos ou duplicados
 *       404:
 *         description: Localização não encontrada
 */
locationRoutes.put("/:id", updateLocation);

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     tags: [Locations]
 *     summary: Delete a location
 *     description: Desativa uma localização (soft delete) se não houver inventário positivo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da localização
 *     responses:
 *       200:
 *         description: Localização desativada com sucesso
 *       400:
 *         description: Não é possível deletar localização com inventário positivo
 *       404:
 *         description: Localização não encontrada
 */
locationRoutes.delete("/:id", deleteLocation);

export default locationRoutes;
