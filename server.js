const express = require('express')
const bodyParser = require('body-parser');
const BraviaRemoteControl = require('sony-bravia-tv-remote');
require('dotenv').config()


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
  console.log(btn);
  res.send('OK');
  action = null;
  switch(req.body.btn) {
    case "tv": action = "TvPower"; break;
    case "keyboard_arrow_up": action = "Up"; break;
    case "keyboard_arrow_down": action = "Down"; break;
    case "keyboard_arrow_right": action = "Right"; break;
    case "keyboard_arrow_left": action = "Left"; break;
    case "brightness_1": action = "Enter"; break;
    case "home": action = "Home"; break;
    case "movie": action = "Netflix"; break;
    case "volup": action = "VolumeUp"; break;
    case "voldown": action = "VolumeDown"; break;
  }

  if (action)
    remote.sendAction(action);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
