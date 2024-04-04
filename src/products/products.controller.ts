import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {
    console.log('INSIDEE');
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Post()
  async createProduct(@Body() createProductDto: any) {
    return this.productService.createProduct(createProductDto);
  }
}
