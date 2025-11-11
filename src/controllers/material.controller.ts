import { Request, Response } from 'express';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllMaterial = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    const filters: any = {};

    if (name) filters.name = name;

    const inventories = await prisma.material.findMany({
      where: filters
    });

    res.status(200).json(inventories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching materials.' });
  }
};

export const createMaterial = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    
    const existing = await prisma.material.findFirst({
      where: { name },
    });

    if (existing) {
      return res.status(400).json({ error: 'MAterial already exists.' });
    }

    const newMaterial = await prisma.material.create({
      data: {
        name: name,
      },
    });

    res
      .status(201)
      .location(`/material/${newMaterial.id}`)
      .json({ id: newMaterial.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while creating material.' });
  }
};

export const updateMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const existingMaterial = await prisma.material.findUnique({
      where: { id: Number(id) },
    });

    if (!existingMaterial) {
      return res.status(404).json({ error: 'material not found.' });
    }

    if (existingMaterial.location?.isActive === false) {
      return res.status(403).json({ error: 'Material is inactive.' });
    }

    const location = await prisma.location.findUnique({ where: { id: Number(location_id) } });
    if (!location) {
      return res.status(400).json({ error: 'Invalid location_id.' });
    }

    const material = await prisma.material.findUnique({ where: { id: Number(material_id) } });
    if (!material) {
      return res.status(400).json({ error: 'Invalid material_id.' });
    }

    const duplicate = await prisma.material.findFirst({
      where: {
        locationId: Number(location_id),
        materialId: Number(material_id),
        NOT: { id: Number(id) },
      },
    });

    if (duplicate) {
      return res.status(400).json({ error: 'material with this location_id and material_id already exists.' });
    }

    await prisma.material.update({
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
    res.status(500).json({ error: 'Error while updating material.' });
  }
};

export const patchmaterialQuantity = async (req: Request, res: Response) => {
  try {
    const { id, quantity } = req.params;

    if (Number(quantity) < 0) {
      return res.status(400).json({ error: 'Quantity must be greater than 0.' });
    }

    const material = await prisma.material.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    });

    if (!material) {
      return res.status(404).json({ error: 'material not found.' });
    }

    if (material.location?.isActive === false) {
      return res.status(403).json({ error: 'Location is inactive.' });
    }

    await prisma.material.update({
      where: { id: Number(id) },
      data: { quantity: Number(quantity) },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while updating material quantity.' });
  }
};

export const getmaterialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const material = await prisma.material.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    });

    if (!material) {
      return res.status(404).json({ error: 'material not found.' });
    }

    if (material.location?.isActive === false) {
      return res.status(404).json({ error: 'Location not found.' });
    }

    const response = {
      location_id: material.locationId,
      material_id: material.materialId,
      quantity: material.quantity,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching material.' });
  }
};

export const deletematerial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const material = await prisma.material.findUnique({
      where: { id: Number(id) },
      include: { location: true },
    });

    if (!material) {
      return res.status(404).json({ error: 'material not found.' });
    }

    if (material.location?.isActive === false) {
      return res.status(404).json({ error: 'Location not found.' });
    }

    if (material.quantity > 0) {
      return res.status(400).json({ error: 'Cannot delete material with existing quantity.' });
    }

    await prisma.material.update({
      where: { id: Number(id) },
      data: { isActive: false },
    });

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while deleting material.' });
  }
};