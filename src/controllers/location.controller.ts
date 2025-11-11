import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLocation = async (req: Request, res: Response) => {
  try {
    const { city, unity, state, street, country } = req.body;

    if (!city || !unity || !state || !street || !country) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existing = await prisma.location.findFirst({
      where: {
        city,
        unity,
      },
    });

    if (existing) {
      return res
        .status(409)
        .json({ error: "A location with this city and unit already exists." });
    }

    const newLocation = await prisma.location.create({
      data: {
        city,
        unity,
        state,
        street,
        country,
      },
    });

    res.status(201).json(newLocation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while creating new location." });
  }
};

export const getAllLocations = async (req: Request, res: Response) => {
  try {
    const allLocations = await prisma.location.findMany();

    res.status(200).json(allLocations);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: 'Erro ao buscar localizações' });
  }
};

export const updateLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { city, unity, state, street } = req.body;

    if (!city || !unity || !state || !street) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const existingLocation = await prisma.location.findUnique({
      where: { id: Number(id) },
    });

    if (!existingLocation || existingLocation.isActive === false) {
      return res.status(404).json({ error: "Location not found." });
    }

    const duplicate = await prisma.location.findFirst({
      where: {
        city: city,
        unity: unity,
        NOT: { id: Number(id) },
      },
    });

    if (duplicate) {
      return res
        .status(400)
        .json({ error: "A location with this city and unit already exists." });
    }

    await prisma.location.update({
      where: { id: Number(id) },
      data: {
        city: city,
        unity: unity,
        state: state,
        street: street,
      },
    });

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while updating location." });
  }
};

export const deleteLocation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const location = await prisma.location.findUnique({
      where: { id: Number(id) },
      include: { inventory: true },
    });

    if (!location || location.isActive === false) {
      return res.status(404).json({ error: "Location not found." });
    }

    const hasPositiveInventory = location.inventory.some(
      (inv: any) => inv.quantity > 0
    );
    if (hasPositiveInventory) {
      return res
        .status(400)
        .json({ error: "Cannot delete a location with positive inventory." });
    }

    await prisma.location.update({
      where: { id: Number(id) },
      data: { isActive: false },
    });

    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting location." });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const location = await prisma.location.findUnique({
      where: { id: Number(id) },
      include: { inventory: true },
    });

    if (!location || location.isActive === false) {
      return res.status(404).json({ error: "Location not found." });
    }

    res.status(200).send(location);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error while deleting location." });
  }
};
