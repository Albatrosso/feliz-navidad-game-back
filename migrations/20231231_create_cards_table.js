exports.up = function (knex) {
  return knex.schema.createTable('cards', function (table) {
    table.increments('id').primary();
    table.string('name').notNullable().unique();
    table.boolean('chosen').defaultTo(false);
    table.string('chosenBy')
    table.string('img')
    table.string('code').notNullable().unique();
  })
  .then(() => {
    return knex('cards').insert([
      { 
        name: 'Карточка 1',
        chosen: false,
        code: 'jest',
        img: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYRNics2o95DUW2PWLcxeH5DUbelHzNyGwrIJPBrVw2BAxmLg0UWs5oT312ObHTGc1ktpTlfrz-O499n0GEDezWI_yBO=w3456-h1918',
        chosenBy: ''
      },
      { 
        name: 'Карточка 2',
        chosen: false,
        img: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYTBKFFaGHk2sukQNfC3DRpO-wi-crPvG65n3OZwQDZJWZUDYXreCfXZaUDeS4gFtJYEoq3g4fgZxN53_BbcRKubDIY=w2241-h2412',
        code: 'knight',
        chosenBy: ''
      },
      { 
        name: 'Карточка 3',
        chosen: false,
        img: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYSMPhrO9c_FkF3G0LBevvzeyt4YVLJy51iHh-arB4FAYCMSTA0BOWwsWoSmyl6BI6resDQUHu4QawR-WaJvjJbt4D-tOA=w2241-h2412',
        code: 'nick',
        chosenBy: ''
      },
      { 
        name: 'Карточка 4',
        chosen: false,
        img: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYTgS7FThYoIVkIOVIVQ5ppc5Ew74_pNzHnLOemgHnHo97vpP0gR2FS2iFNUdkGUALyqnYDX95GV3Dc3LaO-LYL7VLnbgg=w3456-h1918',
        code: 'snow',
        chosenBy: ''
      },
      { 
        name: 'Карточка 5',
        chosen: false,
        img: 'https://lh3.googleusercontent.com/u/0/drive-viewer/AEYmBYQubf2iDeWEOF0u9Vg1xRftgc4gaCLz511LhZnd_pczdfZnaC2xg4iUun_2wyCtFiv7d78YZ2F-ot1PzV937QsBxKfz3w=w3456-h1918',
        code: 'miracle',
        chosenBy: '',
      }
    ]);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('cards');
};