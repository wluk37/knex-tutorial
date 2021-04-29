exports.up = function (knex) {
  return knex.schema.createTable("cpu_generation", (table) => {
    table.uuid("id");
    table.string("codename").notNullable();
    table.integer("generation").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("cpu_generation");
};
