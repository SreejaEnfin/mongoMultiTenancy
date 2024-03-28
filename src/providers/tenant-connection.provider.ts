import { InternalServerErrorException } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

export const tenantConnectionProvider = {
  provide: 'TENANT_CONNECTION',
  useFactory: async (request, connection: Connection) => {
    if (!request.tenantId) {
      throw new InternalServerErrorException(
        'Make sure to apply tenant middleware',
      );
    }
    return connection.useDb(`tenant_${request.tenantId}`);
  },
  inject: [REQUEST, getConnectionToken()],
};

// import { InternalServerErrorException } from '@nestjs/common';
// import { REQUEST } from '@nestjs/core';
// import { Connection } from 'mongoose';
// import { getConnectionToken } from '@nestjs/mongoose';
// import { createConnection } from 'typeorm';

// export const tenantConnectionProvider = {
//   provide: 'TENANT_CONNECTION',
//   useFactory: async (request, connection: Connection) => {
//     if (!request.tenantId) {
//       throw new InternalServerErrorException(
//         'Make sure to apply tenant middleware',
//       );
//     }

//     // Check the DB_TYPE environment variable
//     const dbType = process.env.DB_TYPE;
//     const DB_USERNAME = process.env.DB_USERNAME;
//     const DB_PASSWORD = process.env.DB_PASSWORD;
//     const DB_HOST = process.env.DB_HOST;
//     const DB_PORT = process.env.DB_PORT;

//     if (dbType === 'mongo') {
//       // If using MongoDB
//       return connection.useDb(`tenant_${request.tenantId}`);
//     } else if (dbType === 'postgres') {
//       // If using PostgreSQL
//       const tenantConnectionString = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/tenant_${request.tenantId}`;
//       return await createConnection({
//         type: 'postgres',
//         url: tenantConnectionString,
//         entities: [], // Add your entities here
//         synchronize: true, // Automatically sync schema
//       });
//     } else {
//       throw new InternalServerErrorException('Unsupported database type');
//     }
//   },
//   inject: [REQUEST, getConnectionToken()],
// };
