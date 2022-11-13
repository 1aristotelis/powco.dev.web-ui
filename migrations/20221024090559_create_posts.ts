import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id");

    table.string("tx_id", 255).notNullable().unique();

    table.string("reply_tx_id", 255).nullable();

    table.date("timestamp").notNullable();

    table.text("content").notNullable();

    table.string("user", 255).notNullable();

    table.string("tag", 255).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable("posts");
}
