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

    await prisma.material.update({

      where: { id: Number(id) },
      data: {
        name: name
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while updating material.' });
  }
};

export const getMaterialById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const material = await prisma.material.findUnique({
      where: { id: Number(id) },
    });

    if (!material) {
      return res.status(404).json({ error: 'material not found.' });
    }

    res.status(200).json(material);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error while fetching material.' });
  }
};

export const deleteMaterial = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const material = await prisma.material.findUnique({
      where: { id: Number(id) },
    });

    if (!material) {
      return res.status(404).json({ error: 'material not found.' });
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