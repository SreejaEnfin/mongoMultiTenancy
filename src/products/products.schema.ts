import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Schema, Document, model, SchemaOptions } from 'mongoose';

// Define a shared interface for the product entity
export interface Product {
  name: string;
  description: string;
  price: number;
}

// Define the schema options for Mongoose
const mongooseSchemaOptions: SchemaOptions<Product> = {
  timestamps: true, // Add timestamps if needed
};

// Implement the shared interface for MongoDB (Mongoose)
export const ProductSchema = new Schema<Product>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
  },
  mongooseSchemaOptions,
);

export const MongoProductModel = model<Product & Document>(
  'Product',
  ProductSchema,
);

// Implement the shared interface for PostgreSQL (TypeORM)
@Entity()
export class PostgresProductModel implements Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;
}

// Function to get the appropriate model based on DB_TYPE environment variable
export function getProductModel(): any {
  const dbType = process.env.DB_TYPE;
  if (dbType === 'mongo') {
    return MongoProductModel;
  } else if (dbType === 'postgres') {
    return PostgresProductModel;
  } else {
    throw new Error(`Unsupported database type: ${dbType}`);
  }
}
