var express = require('express');
var router = express.Router();

var myArray = [];

function Car(model, make) {
  this.model = model;
  this.make = make;
}

myArray.push(new Car("RE-45", "Mazda"))
myArray.push(new Car("R7-25", "BronKlin"))

const Servermovies = [
  {title: 'Wild At Heart', year: '1993', type: 'Action' },
  {title: 'Moonstruck', year: '1994', type: 'Romance' },
  {title: 'Raising Arizona', year: '1995', type: 'Comedy' }
]

console.log(Servermovies);

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html');
});

router.get('/GetAllData', function(req, res) {
  res.status(200).json(Servermovies);
});


module.exports = router;
