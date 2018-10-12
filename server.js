const express = require('express')
const bodyParser = require('body-parser');
const BraviaRemoteControl = require('sony-bravia-tv-remote');
require('dotenv').config()

const actionMap = {
  "tv" : "TvPower",
  "keyboard_arrow_up" : "Up",
  "keyboard_arrow_down" : "Down",
  "keyboard_arrow_right" : "Right",
  "keyboard_arrow_left" : "Left",
  "brightness_1" : "Enter",
  "home" : "Home",
  "movie" : "Netflix",
  "volume_up" : "VolumeUp",
  "volume_down" : "VolumeDown",
  "volume_mute" : "Mute",
};

const remote = new BraviaRemoteControl('10.22.16.157', 80, '1022');

const app = express()
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
 
app.get('/', function (req, res) {
  res.render('index')
})

app.post('/', function (req, res) {
  btn = req.body.btn;
  
  action = actionMap[req.body.btn] || null;

  if (action)
    remote.sendAction](action);

  res.send('OK');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
