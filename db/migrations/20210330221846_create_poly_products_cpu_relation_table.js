const RELATION_TABLE_NAME = "poly_products_cpu_relations";
exports.up = function (knex) {
  return knex.schema.createTable(RELATION_TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      .notNullable;
    table.timestamps(true, true);
    table.uuid("poly_product_id");
    table.uuid("cpu_id");
    table.foreign("poly_product_id").references("poly_products.id");
    table.foreign("cpu_id").references("cpu.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(RELATION_TABLE_NAME);
};
