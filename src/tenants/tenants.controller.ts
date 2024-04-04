import { Body, Controller, Post, Get } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async create(@Body() data: any) {
    return this.tenantsService.createTenant(data);
  }

  @Get()
  async getProducts() {
    return this.tenantsService.getProducts();
  }
}
