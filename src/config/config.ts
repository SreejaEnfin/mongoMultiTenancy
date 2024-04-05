export default () => ({
  server: {
    port: process.env.PORT || 3000,
  },
  database: {
    mongoConnectionString: process.env.MONGODB_CONNECTION_STRING,
    postgresConnectionString: process.env.POSTGRES_DB_CONNECTION_STRING,
    dbType: process.env.DB_TYPE,
    mongoDB: process.env.MONGODB_DB,
  },
  postgres: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
