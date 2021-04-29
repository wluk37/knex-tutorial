// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "postgres",
      password: "SanFrancisco3!",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
