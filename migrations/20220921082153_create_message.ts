import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    return knex.schema.createTable('messages', table => {

        table.increments('id');

        table.string('tx_id',255).notNullable().unique();

        table.date('timestamp').notNullable();

        table.text('content').notNullable();

        table.string('user', 255).notNullable()

        table.string('url',255).notNullable()

    })
}


export async function down(knex: Knex): Promise<void> {

    knex.schema.dropTable('messages')
}

