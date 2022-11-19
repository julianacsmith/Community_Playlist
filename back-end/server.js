const express = require('express');
const bodyParser = require('body-parser');
const crypto = require("node:crypto");

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

app.listen(3000, () => console.log('Server listening on port 3000!'));

let people = [];
let playlists = [];
let id = "";
let numOfLists = 0;
let playlistName = "";
let genre = "";
let numOfSongs = 0;
let runtime = "";
let link = "";


app.post('/api/playlist', (req, res) => {
  const id = crypto.randomUUID();
  let item = {
    id: id,
    playlistName: req.body.playlistName,
    genre: req.body.genre,
    numOfSongs: req.body.numOfSongs,
    runtime: req.body.runtime,
    link: req.body.link,
  };
  playlists.push(item);
  res.send(item);
});

app.get('/api/playlist', (req, res) => {
  res.send(playlists);
});

app.get('/api/playlist/:id', (req, res) => {
  let id = req.params.id;
  let itemsMap = playlists.map(item => {
    return item.id;
  });
  let index = itemsMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that playlist doesn't exist");
    return;
  }
  let found = playlists[index];
  res.send(found);
});

app.delete('/api/playlist/:id', (req, res) => {
  let id = req.params.id;
  let itemsMap = playlists.map(item => {
    return item.id;
  });
  let index = itemsMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  let item = playlists[index];
  playlists.splice(index,1);
  res.send(item);
});

app.get('/api/people', (req, res) => {
  res.send(people);
});

app.post('/api/people/:id', (req, res) => {
  const id = req.params.id;
  const foundItem = people.find(item => item.id == id);
  if (foundItem) {
    foundItem.quantity += 1;
    res.send(foundItem);
  } else {
    let item = {
      id: id,
      numOfLists: 0,
      playlists: [],
    };
    people.push(item);
    res.send(item);
  }
});

app.delete('/api/people/:id', (req, res) => {
  let id = req.params.id;
  const foundItem = people.find(item => item.id == id);
  if (!foundItem) {
    res.status(404)
      .send("Sorry, that person doesn't exist");
    return;
  }
  let cartMap = people.map(item => {
    return item.id;
  });
  let index = cartMap.indexOf(foundItem.id);
  console.log(index);
  people.splice(index,1);
  res.send(foundItem);
});