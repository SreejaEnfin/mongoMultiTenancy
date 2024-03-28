import { Inject, Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';
import { Product } from './products.schema';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(@Inject('PRODUCT_MODEL') private ProductModel: Model<Product>) {}

  async getProducts() {
    return this.ProductModel.find();
  }
}
