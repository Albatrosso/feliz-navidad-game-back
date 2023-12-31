const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
app.use(cors())

// Подключаемся к SQLite (создается файл базы данных: players.db)
const db = new sqlite3.Database('./database/game.db');

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
app.post('/authorize', (req, res) => {
  const { name } = req.body;
  console.log(name)
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
    db.get('SELECT * FROM players WHERE name = ?', [name], (err, player) => {
      console.log(player)
      if (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ player });
    })
  });
});

// Обработчик для получения статуса игроков
app.get('/players', (req, res) => {
  // Получаем список игроков и их статус (онлайн/офлайн)
  db.all('SELECT name, online FROM players', (err, players) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ players });
  });
});


// Обработчик для выбора карты
app.post('/chooseCard', (req, res) => {
  const { playerCode, chosenCard } = req.body;
  if (!playerCode || !chosenCard) {
    return res.status(400).json({ error: 'Player name and chosen card are required' });
  }

  // Реализуйте здесь логику выбора карты и передачи очереди
  db.run('UPDATE cards SET chosen = 1, chosenBy = ?  WHERE code = ?', [playerCode, chosenCard], (err) => {
    if(err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    db.get('SELECT * FROM cards WHERE code = ?', [chosenCard], (err, card) => {
      if(err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ card });
    })
  })

});

app.get('/cards', (req, res) => {
  // Получаем список карт
  db.all('SELECT * FROM cards WHERE chosen = 0', (err, cards) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ cards });
  });
});

app.post('/chooseCard', (req, res) => {
  const {playerCode, cardCode} = req.body;

  if(!playerCode || !cardCode) {
    return res.status(400).json({ error: 'Для выбора карты, нужны данные игрока и карты' });
  }

  db.run('UPDATE cards SET (chosen = 1, chosenBy = ?) WHERE code = ?', [playerCode, cardCode], (err) => {
    if(err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    db.get('SELECT * FROM cards WHERE code = ?', [playerCode], (err, card) => {
      if(err) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ card });
    }) 
  })
})

app.post('/myCard ', (req, res) => {
  const {playerCode} = req.body;
  db.get('SELECT * FROM cards WHERE (chosen = 1, chosenBy = ?)', [playerCode], (err, card) => {
    if(err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ card });
  })
})

app.post('/insertPlayer', (req, res) => {
  const { name, online } = req.body;
  if (!name || online === undefined) {
    return res.status(400).json({ error: 'Name and online status are required' });
  }

  // Insert the new player into the players table
  db.run('INSERT INTO players (name, online) VALUES (?, ?)', [name, online], (err) => {
    if (err) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ success: true });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
