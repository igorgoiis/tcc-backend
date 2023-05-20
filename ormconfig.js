module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: 'postgres',
  database: 'tcc',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};
