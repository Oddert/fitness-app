require('dotenv').config()
const express         = require('express'),
      app             = express(),
      bodyParser      = require('body-parser'),
      ejs             = require('ejs'),

      methodOverride  = require('method-override'),
      mongoose        = require('mongoose');

const User        = require('./models/User'),
      Activities  = require('./models/Activities');

const PORT        = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/adduser', (req, res) => {
  User.create({username: req.body.username}, (err, createdUser) => {
    if (err) {
      console.error(err);
      res.send(JSON.stringify(err));
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify(createdUser));
    }
  });
});

app.post('/addactivity', (req, res) => {
  const createActivity = Object.assign({
    name: 'Activity',
    user: {}
  }, req.body.newactivity);

  User.findOne({username: req.body.username}, (err, foundUser) => {
    if (err) {
      console.error(err);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.Stringify(err));
    } else {
      createActivity.user.username = foundUser.username;
      createActivity.user.id = foundUser._id;
      Activities.create(createActivity, (err, newActivity) => {
        if (err) {
          console.error(err);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.Stringify(err));
        } else {
          foundUser.activities.push(newActivity._id);
          foundUser.save();

          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(newActivity));
        }
      });
    }
  });
});

app.get('/api/log', (req, res) => {
  //duration 12, 46

  let minDate;
  let maxDate;

  if (new Date(req.query.from) == 'Invalid Date') {
    console.log("User submitted an invalid from date, defaulting...");
    minDate = new Date('1970/01/01');
  } else {
    console.log("From date valid...");
    minDate = new Date(req.query.from);
  }

  if (new Date(req.query.to) == 'Invalid Date') {
    console.log("User submitted an invalid to date, defaulting...");
    maxDate = new Date();
  } else {
    console.log("To date valid...");
    maxDate = new Date(req.query.to);
  }

  let limit   = req.query.limit ? Number(req.query.limit) : Math.pow(2, 31);
  if (req.query.limit && req.query.limit <= Math.pow(2, 31)) {limit = Number(req.query.limit)}

  console.log(req.query);
  console.log(minDate, maxDate);

  User.findOne({username: req.query.username})
      .populate('activities')
      .exec((err, foundUser) => {
        if (err) {
          console.error(err);
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(err));
        } else {
          Activities.find({
            'user.id': foundUser._id,
            date: {$gt: minDate, $lt: maxDate}
          })
          .limit(limit)
          .exec((err, foundActivities) => {
            if (err) {
              console.error(err);
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(err));
            } else {
              res.setHeader('Content-Type', 'application/json');
              res.send(JSON.stringify(foundActivities));
            }
          });
        }
      });
});

app.listen(PORT, () => console.log(`${new Date().toTimeString()}: Server Initialised on port: ${PORT}...`))
