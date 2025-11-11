import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API está funcionando!' });
});


app.post('/locations', async (req: Request, res: Response) => {
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
});


app.get('/locations', async (req: Request, res: Response) => {
  try {
    const allLocations = await prisma.location.findMany();

    res.status(200).json(allLocations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar localizações' });
  }
});


app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});