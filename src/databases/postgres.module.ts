import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: async (configService: ConfigService) => {
        // Add console.log statement here
        console.log('PostgresModule selected');

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
    }),
  ],
})
export class PostgresModule {}
