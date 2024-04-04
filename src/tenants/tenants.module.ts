import { Global, Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { MongooseModule } from '@nestjs/mongoose';
// import { getTenantModel } from './tenants.schema';
import { tenantConnectionProvider } from 'src/providers/tenant-connection.provider';
import { determineDatabaseModule } from 'src/utils/helper';
import { Tenant, TenantSchema } from './tenants.schema';
// import { determineDatabaseModule } from 'src/utils/helper';
import { TenantsController } from './tenants.controller';
@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Tenant.name,
        schema: TenantSchema,
      },
    ]),
    determineDatabaseModule(),
  ],
  controllers: [TenantsController],
  providers: [TenantsService, tenantConnectionProvider],
  exports: [TenantsService, tenantConnectionProvider],
})
export class TenantsModule {}
