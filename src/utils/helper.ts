import {
  ObjectIdColumn,
  PrimaryGeneratedColumn,
  getMetadataArgsStorage,
} from 'typeorm';
import * as dotenv from 'dotenv';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenv.config();

export const determineDB = () => {
  return process.env.DB_TYPE;
};

export const getIdColumnDecorator = () => {
  determineDB();
  if (process.env.DB_TYPE === 'postgres') {
    console.log('returning postgres');
    return PrimaryGeneratedColumn('uuid');
  } else {
    console.log('returning mongo');
    return ObjectIdColumn();
  }
};

export const determineDatabaseModule = () => {
  // return process.env.DB_TYPE === 'postgres'
  //   ? PostgresModule'
  //   : MongooseModule.forRootAsync({
  //       imports: [ConfigModule],
  //       useFactory: async (config) => ({
  //         uri: config.get('database.mongoConnectionString'),
  //       }),
  //       inject: [ConfigService, ModuleRef],
  //     });

  return process.env.DB_TYPE === 'postgres'
    ? TypeOrmModule.forRootAsync({
        imports: [],
        useFactory: async (configService: ConfigService) => {
          const entities = getMetadataArgsStorage()
            // eslint-disable-next-line @typescript-eslint/ban-types
            .tables.map((tbl) => tbl.target as Function)
            .filter((entity) =>
              entity.toString().toLowerCase().includes('entity'),
            );
          return {
            type: 'postgres',
            host: configService.get('postgres.host'),
            port: configService.get('postgres.port'),
            username: configService.get('postgres.username'),
            password: configService.get('postgres.password'),
            database: configService.get('postgres.database'),
            entities,
            synchronize: true, // Be cautious about using synchronize in production
            logging: true,
            autoLoadEntities: true,
          };
        },
        inject: [ConfigService],
      })
    : MongooseModule.forRootAsync({
        imports: [ConfigModule],
        useFactory: async (config) => ({
          uri: config.get('database.mongoConnectionString'),
        }),
        inject: [ConfigService],
      });
};
