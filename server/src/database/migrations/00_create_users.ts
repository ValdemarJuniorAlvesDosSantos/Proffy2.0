import Knex  from 'knex';

export async function up( knex: Knex){
    return knex.schema.createTable('users' , table => 
    {
        table.increments('id').primary();
        
        table.string('name').notNullable();
        table.string('lastName').notNullable();
        table.string('email').notNullable().unique();
        table.string('password').notNullable();

        table.string('avatar').defaultTo("");
        table.string('whatsapp').defaultTo("");
        table.string('bio').defaultTo("");

        table.string('tokenReset');
        table.dateTime('tokenResetExpire');

    });
}

export async function down( knex: Knex){
    return knex.schema.dropTable('users');

}
