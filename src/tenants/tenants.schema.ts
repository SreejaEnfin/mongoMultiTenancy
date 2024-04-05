import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Tenant extends Document {
  @Prop({ required: true })
  companyName: string;
  @Prop({ required: true, unique: true })
  tenantId: string;
  @Prop({ required: true, unique: true })
  tenantUserName: string;
  @Prop({ required: true })
  tenantPassword: string;
}

export const TenantSchema = SchemaFactory.createForClass(Tenant);

// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
// import { getModelForClass } from '@typegoose/typegoose';

// // Define a shared interface for the Tenant entity
// export interface Tenant {
//   companyName: string;
//   tenantId: string;
// }

// // MongoDB version using Mongoose
// @Schema()
// export class MongoTenant {
//   @Prop({ required: true })
//   companyName: string;

//   @Prop({ required: true, unique: true })
//   tenantId: string;
// }

// export const MongoTenantSchema = SchemaFactory.createForClass(MongoTenant);

// // PostgreSQL version using TypeORM
// @Entity()
// export class PostgresTenant implements Tenant {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   companyName: string;

//   @Column({ unique: true })
//   tenantId: string;
// }

// // Function to get the appropriate model based on DB_TYPE environment variable
// export function getTenantModel(): any {
//   const dbType = process.env.DB_TYPE;
//   if (dbType === 'mongo') {
//     return getModelForClass(MongoTenant);
//   } else if (dbType === 'postgres') {
//     return PostgresTenant;
//   } else {
//     throw new Error(`Unsupported database type: ${dbType}`);
//   }
// }
