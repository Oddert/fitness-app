const express         = require('express'),
      app             = express(),
      bodyParser      = require('body-parser'),
      ejs             = require('ejs'),

      methodOverride  = require('method-override'),
      mongoose        = require('mongoose');

const User        = require('./models/User'),
      Activities  = require('./models/Activities');

const PORT        = process.env.PORT || 3000,
      MADE_WITH   = 'Oddert',
      SECRET      = 'Bugatt1rulesoK';

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(PORT, () => console.log(`Server Initialised on port: ${PORT}`))
