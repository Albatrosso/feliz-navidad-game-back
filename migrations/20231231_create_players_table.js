exports.up = function (knex) {
  return knex.schema.createTable('players', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.boolean('online').defaultTo('false');
    table.string('code').notNullable().unique();
  })
  .then(() => {
    // Вставляем 5 пользователей
    return knex('players').insert([
      { 
        name: 'Кит',
        online: false,
        code: 'kit'
      },
      { 
        name: 'Миша',
        online: false,
        code: 'misha'
      },
      { 
        name: 'Даша',
        online: false,
        code: 'dasha'
      },
      { 
        name: 'Федя',
        online: false,
        code: 'fedos'
      },
      { 
        name: 'Никита',
        online: false,
        code: 'nikita'
      },
    ]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('players');
};