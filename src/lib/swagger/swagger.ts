// src/lib/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Hackathon Spark API',
      version: '1.0.0',
      description:
        'API para gerenciamento de inventário (Locations, Materials, Inventory)',
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
    components: {
      schemas: {
        Location: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            city: { type: 'string', example: 'São Paulo' },
            unity: { type: 'string', example: '001' },
            state: { type: 'string', example: 'SP' },
            street: { type: 'string', example: 'Av. Paulista, 1000' },
            country: { type: 'string', example: 'Brasil' },
          },
        },
        Material: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Cadeira de Escritório' },
          },
        },
        Inventory: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            quantity: { type: 'integer', example: 150 },
            locationId: { type: 'integer', example: 1 },
            materialId: { type: 'integer', example: 1 },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;