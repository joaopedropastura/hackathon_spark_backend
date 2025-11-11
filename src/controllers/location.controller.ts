import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createLocation = async (req: Request, res: Response) => {
  try {
    const { city, unity, state, street, country } = req.body;

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
    res.status(500).json({ error: 'Erro ao criar nova localização' });
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