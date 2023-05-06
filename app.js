const express = require('express'),
  path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes'));

app.listen(PORT, () => {
  console.log(`Сервер был запущен на ${process.env.DOMAIN}:${PORT}...`)
})