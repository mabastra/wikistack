const express = require("express");
const morgan = require("morgan");
const views = require('./views/');
const layout = require("./views/layout");
const { db } = require('./models');

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));
app.use('/wiki', require('./routes/wiki'));
app.use('/users', require('./routes/users'));

db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

app.get('/', (req, res, next) => {
    res.redirect('/wiki');
    next();
});

const PORT = 1221;

async function initialize () {
  await db.sync();
//   await db.sync({force: true});

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
}

initialize();
