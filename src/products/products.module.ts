import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { TenantsMiddleware } from 'src/middlewares/tenants.middleware';
import { tenantConnectionProvider } from 'src/providers/tenant-connection.provider';
import { tenantModels } from 'src/providers/tenant-models.provider';
import { determineDatabaseModule } from 'src/utils/helper';

@Module({
  imports: [determineDatabaseModule()],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    tenantConnectionProvider,
    tenantModels.productModel,
  ],
})
export class ProductsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantsMiddleware).forRoutes(ProductsController);
  }
}
