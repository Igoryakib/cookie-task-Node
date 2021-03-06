const express = require('express');
require('dotenv').config();
const volleyball = require('volleyball');
const compression = require('compression');
const path = require('path');
// Імпортувати cookie-parser
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(process.cwd(), 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(volleyball);
app.use(compression());
// Підключити cookiesParser
app.use(cookieParser(process.env.COOKIE_SECRET));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.get('/profile', (req, res) => {
  const username = req.cookies['username'];
  res.render('profile', {
    username, // username потрібно взяти з куків
  });
});

app.post('/login', (req, res) => {
  // Зберегти в куки username з req.body.username
  const {username} = req.body;
  res.cookie('username', username);
  res.redirect('/profile');
});

module.exports = app;
