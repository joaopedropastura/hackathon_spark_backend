import { Router } from 'express';
import {
  createInventory,
  getAllInventories,
  getInventoryById,
  updateInventory,
  patchInventoryQuantity,
  deleteInventory,
} from '../controllers/inventory.controller';

const inventoryRoutes = Router();

/**
 * @swagger
 * /inventories:
 *   get:
 *     tags: [Inventories]
 *     summary: Retrieve a list of inventory items
 *     description: Retorna todos os itens de inventário, com filtros opcionais via query string.
 *     parameters:
 *       - in: query
 *         name: location_id
 *         schema:
 *           type: integer
 *         description: Filtra pelo ID da localização
 *       - in: query
 *         name: material_id
 *         schema:
 *           type: integer
 *         description: Filtra pelo ID do material
 *       - in: query
 *         name: quantity_min
 *         schema:
 *           type: integer
 *         description: Filtra pela quantidade mínima (maior ou igual a)
 *     responses:
 *       200:
 *         description: Lista de inventário retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InventoryItem'
 */
inventoryRoutes.get('/', getAllInventories);

/**
 * @swagger
 * /inventories:
 *   post:
 *     tags: [Inventories]
 *     summary: Create a new inventory item
 *     description: Cria um novo item de inventário (a relação entre um material e uma localização).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateInventoryDTO'
 *     responses:
 *       201:
 *         description: Item de inventário criado com sucesso
 *         headers:
 *           Location:
 *             description: O caminho para o recurso recém-criado
 *             schema:
 *               type: string
 *               example: /inventories/123
 *       400:
 *         description: Dados inválidos (campos faltando, IDs inválidos, duplicata, etc.)
 */
inventoryRoutes.post('/', createInventory);

/**
 * @swagger
 * /inventories/{id}:
 *   get:
 *     tags: [Inventories]
 *     summary: Get an inventory item by ID
 *     description: Retorna um item de inventário específico pelo seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do item de inventário
 *     responses:
 *       200:
 *         description: Item de inventário retornado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InventoryItem'
 *       404:
 *         description: Item de inventário não encontrado (ou sua localização está inativa)
 */
inventoryRoutes.get('/:id', getInventoryById);

/**
 * @swagger
 * /inventories/{id}:
 *   put:
 *     tags: [Inventories]
 *     summary: Update a complete inventory item
 *     description: Atualiza completamente um item de inventário (location_id, material_id, quantity).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do item de inventário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateInventoryDTO'
 *     responses:
 *       204:
 *         description: Item de inventário atualizado com sucesso (sem conteúdo)
 *       400:
 *         description: Dados inválidos (campos faltando, IDs inválidos, duplicata, etc.)
 *       403:
 *         description: A localização do item está inativa e não pode ser modificada
 *       404:
 *         description: Item de inventário não encontrado
 */
inventoryRoutes.put('/:id', updateInventory);

/**
 * @swagger
 * /inventories/{id}:
 *   patch:
 *     tags: [Inventories]
 *     summary: Update only the quantity of an inventory item
 *     description: Atualiza parcialmente um item de inventário (especificamente a quantidade).
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do item de inventário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *                 example: 150
 *     responses:
 *       204:
 *         description: Quantidade do item atualizada com sucesso (sem conteúdo)
 *       400:
 *         description: Quantidade inválida (menor que 0 ou não fornecida)
 *       403:
 *         description: A localização do item está inativa e não pode ser modificada
 *       404:
 *         description: Item de inventário não encontrado
 */
inventoryRoutes.patch('/:id', patchInventoryQuantity);

/**
 * @swagger
 * /inventories/{id}:
 *   delete:
 *     tags: [Inventories]
 *     summary: Deactivate an inventory item (soft delete)
 *     description: Desativa um item de inventário (soft delete) se a quantidade for 0.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O ID do item de inventário a ser desativado
 *     responses:
 *       200:
 *         description: Item de inventário desativado com sucesso (OK)
 *       400:
 *         description: Não é possível desativar (inventário com quantidade > 0)
 *       404:
 *         description: Item de inventário não encontrado (ou sua localização está inativa)
 */
inventoryRoutes.delete('/:id', deleteInventory);

export default inventoryRoutes;
