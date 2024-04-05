// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { MongooseModule } from '@nestjs/mongoose';
// import config from './config/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TenantsModule } from './tenants/tenants.module';
// import { ProductsModule } from './products/products.module';

// // Import TypeORM and Mongoose modules conditionally based on the database type
// const databaseModules = [];

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true,
//       cache: true,
//       load: [config],
//     }),
//     ...databaseModules, // Include imported modules dynamically
//     ProductsModule,
//     TenantsModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}

// // Determine database type and import modules accordingly
// const dbType = process.env.DB_TYPE;
// console.log(process.env.DB_TYPE);
// switch (dbType) {
//   case 'postgres':
//     databaseModules.push(
//       TypeOrmModule.forRootAsync({
//         imports: [ConfigModule],
//         useFactory: async (configService: ConfigService) => {
//           console.log(
//             'Using TypeOrmModule for PostgreSQL',
//             configService.get('database.postgresConnectionString'),
//           );
//           return {
//             type: 'postgres',
//             url: configService.get('database.postgresConnectionString'),
//             // Add other TypeORM options as needed
//           };
//         },
//         inject: [ConfigService],
//       }),
//     );
//     break;
//   case 'mongo':
//     databaseModules.push(
//       MongooseModule.forRootAsync({
//         imports: [ConfigModule], // Importing ConfigModule for MongooseModule
//         useFactory: async (configService: ConfigService) => {
//           console.log('Using MongooseModule for MongoDB');
//           return {
//             uri: configService.get('database.mongoConnectionString'),
//           };
//         },
//         inject: [ConfigService],
//       }),
//     );
//     break;
//   default:
//     throw new Error(`Unsupported database type: ${dbType}`);
// }

import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
// import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { TenantsModule } from './tenants/tenants.module';
import config from './config/config';
import { determineDatabaseModule } from './utils/helper';
import { getProductModel } from './products/products.schema';
// import { getTenantModel } from './tenants/tenants.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    determineDatabaseModule(),
    // getTenantModel(),
    // getProductModel(),
    TenantsModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
