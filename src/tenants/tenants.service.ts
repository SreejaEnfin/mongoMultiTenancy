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

  async createTenant(data: any): Promise<Tenant> {
    // Generate username
    const timestamp = Date.now();
    const companyName = data.companyName;
    const username = `${companyName}_${timestamp}`;

    // Generate random password
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }

    const createdTenant = new this.TenantModel({
      ...data,
      tenantUserName: username,
      tenantPassword: password,
    });
    return createdTenant.save();
  }

  async getProducts() {
    return this.TenantModel.find();
  }
}
