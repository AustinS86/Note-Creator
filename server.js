const express = require('express');
const path = require('path');
const fs = require('fs');
let db = require('./db/db.json');
const uuid = require('./public/assets/js/uuid');

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  res.json(db);
});

app.post('/api/notes', function (req, res) {
  console.info(`${req.method} note added!`);
  const { title, text } = req.body;
  if (title && text) {
    const newNote = {
      title, text, id: uuid(),
    };
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        db = JSON.parse(data);
        db.push(newNote);
        fs.writeFile('./db/db.json',
          JSON.stringify(db),
          (writeErr) =>
            writeErr
              ? console.error(writeErr)
              : console.info('Successfully updated!')
        );
        res.json(newNote);
      }
    });
  } else {
    res.status(500).json('Error posting note');
  }
});

app.delete('/api/notes/:id', (req, res) => {
  res.json(`${req.method} request received`);
  console.info(`${req.method} request received.`);
  const { id } = req.params;
  const projectIndex = db.findIndex(p => p.id == id);
  db.splice(projectIndex, 1);
  fs.writeFile(
    './db/db.json',
    JSON.stringify(db),
    (writeErr) =>
      writeErr
        ? console.error(writeErr)
        : console.info('Note deleted!')
  );
  return res.send();
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`)
});