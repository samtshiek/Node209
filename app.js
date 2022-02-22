var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();


const movies = [
  {title: 'Wild At Heart', year: '1993' },
  {title: 'Moonstruck', year: '1994' },
  {title: 'Raising Arizona', year: '1995' }
]

const posts = [
  {title: 'Title 1', body: 'Body 1' },
  {title: 'Title 2', body: 'Body 2' },
  {title: 'Title 3', body: 'Body 3' },
  {title: 'Title 4', body: 'Body 4' },
]
const user = {
  firstName: 'Good',
  lastName: 'Student',
  admin: true
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('pages/index', {
      user
  })
})

app.get('/about', (req, res) => {
  res.render('pages/about', {
      user
  })
})

app.get('/articles', (req, res) => {
  res.render('pages/articles', {
      articles: posts
  })
})

app.get('/movies', (req, res) => {
  res.render('pages/movies', {
      moviesRef: movies
  })
})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
