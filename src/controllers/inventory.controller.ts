import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllInventories = async (req: Request, res: Response) => {
  try {
    const { location_id, material_id, quantity_min } = req.query;

    const filters: any = {};

    if (location_id) filters.locationId = Number(location_id);
    if (material_id) filters.materialId = Number(material_id);
    if (quantity_min) filters.quantity = { gte: Number(quantity_min) };

    const inventories = await prisma.inventory.findMany({
      where: filters,
      orderBy: [
        { materialId: 'asc' },
        { locationId: 'asc' },
      ],
      select: {
        materialId: true,
        locationId: true,
        quantity: true,
      },
    });

    res.status(200).json(inventories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching inventories.' });
  }
};

export const createInventory = async (req: Request, res: Response) => {
  try {
    const { location_id, material_id, quantity } = req.body;

    if (!location_id || !material_id || quantity === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0.' });
    }

    const location = await prisma.location.findUnique({ where: { id: Number(location_id) } });
    if (!location) {
      return res.status(400).json({ error: 'Invalid location_id.' });
    }

    const material = await prisma.material.findUnique({ where: { id: Number(material_id) } });
    if (!material) {
      return res.status(400).json({ error: 'Invalid material_id.' });
    }

    const existing = await prisma.inventory.findFirst({
      where: { locationId: Number(location_id), materialId: Number(material_id) },
    });

    if (existing) {
      return res.status(400).json({ error: 'Inventory with this location_id and material_id already exists.' });
    }

    const newInventory = await prisma.inventory.create({
      data: {
        locationId: Number(location_id),
        materialId: Number(material_id),
        quantity: Number(quantity),
      },
    });

    res
      .status(201)
      .location(`/inventories/${newInventory.id}`)
      .json({ id: newInventory.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while creating inventory.' });
  }
};

export const updateInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { location_id, material_id, quantity } = req.body;

    if (!location_id || !material_id || quantity === undefined) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (quantity < 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0.' });
    }

    const existingInventory = await prisma.inventory.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    });

    if (!existingInventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    if (existingInventory.location?.isActive === false) {
      return res.status(403).json({ error: 'Location is inactive.' });
    }

    const location = await prisma.location.findUnique({ where: { id: Number(location_id) } });
    if (!location) {
      return res.status(400).json({ error: 'Invalid location_id.' });
    }

    const material = await prisma.material.findUnique({ where: { id: Number(material_id) } });
    if (!material) {
      return res.status(400).json({ error: 'Invalid material_id.' });
    }

    const duplicate = await prisma.inventory.findFirst({
      where: {
        locationId: Number(location_id),
        materialId: Number(material_id),
        NOT: { id: Number(id) },
      },
    });

    if (duplicate) {
      return res.status(400).json({ error: 'Inventory with this location_id and material_id already exists.' });
    }

    await prisma.inventory.update({
      where: { id: Number(id) },
      data: {
        locationId: Number(location_id),
        materialId: Number(material_id),
        quantity: Number(quantity),
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while updating inventory.' });
  }
};

export const patchInventoryQuantity = async (req: Request, res: Response) => {
  try {
    const { id, quantity } = req.params;

    if (Number(quantity) < 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0.' });
    }

    const inventory = await prisma.inventory.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    if (inventory.location?.isActive === false) {
      return res.status(403).json({ error: 'Location is inactive.' });
    }

    await prisma.inventory.update({
      where: { id: Number(id) },
      data: { quantity: Number(quantity) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while updating inventory quantity.' });
  }
};

export const getInventoryById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const inventory = await prisma.inventory.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    if (inventory.location?.isActive === false) {
      return res.status(404).json({ error: 'Location not found.' });
    }

    const response = {
      location_id: inventory.locationId,
      material_id: inventory.materialId,
      quantity: inventory.quantity,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching inventory.' });
  }
};

export const deleteInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const inventory = await prisma.inventory.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    });

    if (!inventory) {
      return res.status(404).json({ error: 'Inventory not found.' });
    }

    if (inventory.location?.isActive === false) {
      return res.status(404).json({ error: 'Location not found.' });
    }

    if (inventory.quantity > 0) {
      return res.status(400).json({ error: 'Cannot delete inventory with existing quantity.' });
    }

    await prisma.inventory.update({
      where: { id: Number(id) },
      data: { isActive: false },
    });

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while deleting inventory.' });
  }
};