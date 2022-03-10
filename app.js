const express = require("express");
const morgan = require("morgan");
const views = require('./views/');
const layout = require("./views/layout");

const app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.send(layout(''));
    next();
});

const PORT = 1221;
app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});