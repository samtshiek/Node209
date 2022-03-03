var express = require('express');
var router = express.Router();

const ServerAuctionItems = [
  {title: 'Philosopher in meditation', artist: 'Rembrandt', year: '1632', price: 11450000, type: 'Painting' },
  {title: 'Guennol Lioness', artist: 'unknown', year: '5000 B.C.', price: 57000000, type: 'Sculpture' },
  {title: 'La Terrace Ã Sainte-Adresse', artist: 'Claude Monet', year: '1867', price: 11500, type: 'Painting' }
]

console.log(ServerAuctionItems);

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html');
});

router.get('/GetAllData', function(req, res) {
  res.status(200).json(ServerAuctionItems);
});


module.exports = router;
