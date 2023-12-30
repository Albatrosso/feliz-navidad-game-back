const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Подключаемся к SQLite (создается файл базы данных: players.db)
const db = new sqlite3.Database('game.db');

// Создаем таблицу для игроков
db.run(`
  CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    online BOOLEAN
  )
`);

// Создаем таблицу для карт
db.run(`
  CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`);

const availablePlayersNames = ['Кит', 'Миша', 'Даша', 'Федя', 'Никита'];

app.use(bodyParser.json());

// Обработчик для выбора имени игрока
app.post('/selectName', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Имя игрока не может быть пустым' });
  }

  if (!availablePlayersNames.includes(name)) {
    return res.status(400).json({ error: 'Такого игрока на вечеринке нет' });
  }

  // Устанавливаем статус онлайн для выбранного имени
  db.run('UPDATE players SET online = 1 WHERE name = ?', [name], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ success: true });
  });
});

// Обработчик для получения статуса игроков
app.get('/status', (req, res) => {
  // Получаем список игроков и их статус (онлайн/офлайн)
  db.all('SELECT name, online FROM players', (err, players) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ players });
  });
});

// Обработчик для выбора карты
app.post('/chooseCard', (req, res) => {
  const { playerName, chosenCard } = req.body;
  if (!playerName || !chosenCard) {
    return res.status(400).json({ error: 'Player name and chosen card are required' });
  }

  // Реализуйте здесь логику выбора карты и передачи очереди

  res.json({ success: true });
});

app.get('/cards', (req, res) => {
  // Получаем список карт
  db.all('SELECT name FROM cards', (err, cards) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ cards });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
