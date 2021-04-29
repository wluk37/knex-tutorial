const TEST_TABLE_NAME = "test";
exports.up = function (knex) {
  return knex.schema.createTable(TEST_TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      .notNullable;
    table.text("product_names").notNullable().unique();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(TEST_TABLE_NAME);
};
