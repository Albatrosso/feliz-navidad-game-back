module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './database/game.db', // Путь к вашей базе данных SQLite
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations', // Путь к каталогу с миграциями
  },
  useNullAsDefault: true, // Используйте NULL как значение по умолчанию для колонок в SQLite
};