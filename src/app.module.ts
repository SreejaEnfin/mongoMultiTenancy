import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './tenants/tenants.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/config';
@Module({
  imports: [
    TenantsModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        console.log(configService.get('database.dbType'), 'db'); // Log dbType here
        return {
          uri: configService.get('database.connectionString'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// process.env.DB_TYPE === 'mongodb'
//     ? MongooseModule.forRootAsync({
//         imports: [ConfigModule],
//         useFactory: async (configService: ConfigService) => ({
//           uri: configService.get('database.connectionString'),
//         }),
//         inject: [ConfigService],
//       })
//     : TypeOrmModule.forRootAsync({
//         imports: [ConfigModule],
//         useFactory: async (configService: ConfigService) => ({
//           type: 'postgres', // or any other database type you want to use with TypeORM
//           host: configService.get('database.host'),
//           port: configService.get('database.port'),
//           username: configService.get('database.username'),
//           password: configService.get('database.password'),
//           database: configService.get('database.name'),
//           autoLoadEntities: true,
//           synchronize: true,
//         }),
