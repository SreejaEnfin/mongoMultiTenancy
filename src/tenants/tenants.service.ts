import { Injectable } from '@nestjs/common';
import { Tenant } from './tenants.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TenantsService {
  constructor(@InjectModel(Tenant.name) private TenantModel: Model<Tenant>) {}

  async getTenantById(tenantId: string) {
    return this.TenantModel.findOne({ tenantId });
  }
}