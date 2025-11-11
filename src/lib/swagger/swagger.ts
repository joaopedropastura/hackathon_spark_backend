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
        // --- LOCATION ---
        Location: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            city: { type: 'string', example: 'São Paulo' },
            unity: { type: 'string', example: '001' },
            state: { type: 'string', example: 'SP' },
            street: { type: 'string', example: 'Av. Paulista, 1000' },
            country: { type: 'string', example: 'Brasil' }
          },
        },

        // --- MATERIAL ---
        Material: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Cadeira de Escritório' }
          },
        },

        // --- INVENTORY ---
        InventoryItem: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            quantity: { type: 'integer', example: 150 },
            locationId: { type: 'integer', example: 1 },
            materialId: { type: 'integer', example: 1 }
          },
        },

        CreateInventoryDTO: {
          type: 'object',
          required: ['quantity', 'locationId', 'materialId'],
          properties: {
            quantity: { type: 'integer', example: 100 },
            locationId: { type: 'integer', example: 1 },
            materialId: { type: 'integer', example: 1 }
          },
        },

        UpdateInventoryDTO: {
          type: 'object',
          required: ['quantity', 'locationId', 'materialId'],
          properties: {
            quantity: { type: 'integer', example: 200 },
            locationId: { type: 'integer', example: 1 },
            materialId: { type: 'integer', example: 1 }
          },
        },
      },
    },
  },

  apis: [
    './src/routes/location.routes.ts',
    './src/routes/inventory.routes.ts',
    './src/routes/material.routes.ts'
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
