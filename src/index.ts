import express from 'express';

import locationRoutes from './routes/location.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './lib/swagger/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/locations', locationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});