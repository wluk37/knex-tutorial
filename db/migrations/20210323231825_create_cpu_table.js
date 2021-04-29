const CPU_TABLE_NAME = "cpu";
exports.up = function (knex) {
  return knex.schema.createTable(CPU_TABLE_NAME, (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"))
      .notNullable;
    table.timestamps(true, true);
    table.string("cpu_model").notNullable().unique();
    table.string("product_collection").notNullable();
    table.string("launch_date");
    table.integer("cores").notNullable();
    table.integer("threads");
    table.decimal("base_clock_frequency").notNullable();
    table.decimal("max_clock_frequency");
    table.integer("cache");
    table.integer("max_memory_size");
    table.string("memory_type");
    table.integer("max_memory_channels");
    table.integer("tdp").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable(CPU_TABLE_NAME);
};
