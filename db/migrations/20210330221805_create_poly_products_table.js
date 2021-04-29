const POLY_PRODUCTS_TABLE_NAME = "poly_products";
exports.up = function (knex) {
  return knex.schema.createTable(POLY_PRODUCTS_TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      .notNullable;
    table.timestamps(true, true);
    table.string("poly_product_model").notNullable().unique();
    table.string("category");
    table.string("family");
    table.string("oem_model");
    table.string("minix_model");
    table.string("sku");
    table.integer("priority");
    table.uuid("primary_cpu");
    table.foreign("primary_cpu").references("cpu.id");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(POLY_PRODUCTS_TABLE_NAME);
};
