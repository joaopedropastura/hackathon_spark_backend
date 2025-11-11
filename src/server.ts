import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";
import { LocationController } from "./locationController";
const app = express();

useExpressServer(app, {
  controllers: [LocationController],
});

app.listen(3000, () => console.log("🚀 Server rodando em http://localhost:3000"));
