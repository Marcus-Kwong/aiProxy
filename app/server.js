const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use('/gpt', (req, res, next) => {
  if (req.cookies.auth === 'yes') next();
  else res.redirect('/');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '123456') {
    res.cookie('auth', 'yes');
    res.redirect('/gpt/');
  } else {
    res.send('Login failed. <a href="/">Try again</a>');
  }
});

app.listen(3000, () => {
  console.log('Auth server running on http://localhost:3000');
});
