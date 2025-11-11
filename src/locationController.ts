import { Controller, Get, Post, Param, Body, Res } from "routing-controllers";

@Controller("/locations")
export class LocationController {
  @Get("/")
  getAll() {
    return "Hello all locations";
  }
}
