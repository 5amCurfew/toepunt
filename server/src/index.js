require('dotenv').config({ path: './config.env' });
const fs = require('fs');
const path = require('path');
const express = require('express');
const Game = require("./Game");

const app = express();
app.use(express.json());

const teams = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/teams.json'))).teams

app.get("/ping", (req, res) => {
    res.json( { message: "pong!" } )
});

app.get("/teams", (req, res) => {
  res.json( teams )
});

app.post("/predict", (req, res) => {
  res.json( Game.predictScores(req.body.homeTeam, req.body.awayTeam) )
  console.log(req.body.homeTeam.name + ' vs ' + req.body.awayTeam.name + ' requested')
});

// ---------------------------
// START SERVER
// ---------------------------
const port = process.env.PORT || 8080;
app.listen(port, () => {
  const toepunt =
'   __                               __ \n'+
'  / /_____  ___  ____  __  ______  / /_ \n'+
' / __/ __ \\/ _ \\/ __ \\/ / / / __ \\/ __/\n'+
'/ /_/ /_/ /  __/ /_/ / /_/ / / / / /_ \n'+
'\\__/\\____/\\___/ .___/\\__,_/_/ /_/\\__/\n'+
'             /_/                         \n'

  console.log(toepunt);
  console.log('------------------------');
  console.log(`listening on port:${port}`);
});