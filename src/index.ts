import express from 'express';

import locationRoutes from './routes/location.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});