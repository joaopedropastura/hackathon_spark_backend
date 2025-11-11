// src/routes/material.routes.ts
import { Router } from "express";
import {
  getAllMaterial,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial,
} from "../controllers/material.controller";

const materialRoutes = Router();

/**
 * @swagger
 * /materials:
 *   get:
 *     tags: [Materials]
 *     summary: Retrieve a list of materials
 *     description: Retorna todos os materiais cadastrados
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filtra pelo nome do material
 *     responses:
 *       200:
 *         description: Lista de materiais retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Material'
 */
materialRoutes.get("/", getAllMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   get:
 *     tags: [Materials]
 *     summary: Get a material by ID
 *     description: Retorna um material específico pelo seu ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do material
 *     responses:
 *       200:
 *         description: Material encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       404:
 *         description: Material não encontrado
 */
materialRoutes.get("/:id", getMaterialById);

/**
 * @swagger
 * /materials:
 *   post:
 *     tags: [Materials]
 *     summary: Create a new material
 *     description: Cria um novo material
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Material'
 *     responses:
 *       201:
 *         description: Material criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Material'
 *       400:
 *         description: Campos obrigatórios ausentes ou material já existe
 */
materialRoutes.post("/", createMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   put:
 *     tags: [Materials]
 *     summary: Update a material
 *     description: Atualiza completamente os dados de um material
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do material
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Material'
 *     responses:
 *       204:
 *         description: Material atualizado com sucesso (sem conteúdo)
 *       400:
 *         description: Dados inválidos ou material duplicado
 *       404:
 *         description: Material não encontrado
 */
materialRoutes.put("/:id", updateMaterial);

/**
 * @swagger
 * /materials/{id}:
 *   delete:
 *     tags: [Materials]
 *     summary: Delete a material
 *     description: Desativa um material (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do material
 *     responses:
 *       200:
 *         description: Material desativado com sucesso
 *       404:
 *         description: Material não encontrado
 */
materialRoutes.delete("/:id", deleteMaterial);

export default materialRoutes;
