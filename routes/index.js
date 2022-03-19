var express = require('express');
var router = express.Router();

let ServerAuctionItems = [
  {title: 'Philosopher in meditation', artist: 'Rembrandt', year: '1632', price: 11450000, type: 'Painting' },
  {title: 'Guennol Lioness', artist: 'unknown', year: '5000 B.C.', price: 57000000, type: 'Sculpture' },
  {title: 'La Terrace Ã Sainte-Adresse', artist: 'Claude Monet', year: '1867', price: 11500, type: 'Painting' }
]

var fs = require('fs');

let fileManager = {
  read: function() {
    const stat = fs.statSync('auction-data.json');
    if (stat.size !== 0) {
      var rawdata = fs.readFileSync('auction-data.json');
    ServerAuctionItems = JSON.parse(rawdata);
    }
    else {
      ServerAuctionItems = [
        {title: 'Philosopher in meditation', artist: 'Rembrandt', year: '1632', price: 11450000, type: 'Painting' },
        {title: 'Guennol Lioness', artist: 'unknown', year: '5000 B.C.', price: 57000000, type: 'Sculpture' },
        {title: 'La Terrace Ã Sainte-Adresse', artist: 'Claude Monet', year: '1867', price: 11500, type: 'Painting' }
      ]
      fileManager.write();
    }
  },

  write: function() {
    let data = JSON.stringify(ServerAuctionItems);
    fs.writeFileSync('auction-data.json', data);
  }
}


console.log("From server: " + ServerAuctionItems);

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.sendFile('index.html');
});

router.get('/GetAllData', function(req, res) {
  fileManager.read();
  res.status(200).json(ServerAuctionItems);
});

router.post('/postData', function(req, res) {
  console.log("Request body: " + req.body);
  ServerAuctionItems.push(req.body);
  fileManager.write();
  console.log("Array after post: " + ServerAuctionItems);
})

router.delete('/deleteData/:title', (req, res) => {
  let title = req.params.title;
  let found = false;

  for (var i = 0; i < ServerAuctionItems.length; i++) {
    if(ServerAuctionItems[i].title == title) {
      ServerAuctionItems.splice(i, 1);

      found = true;
      fileManager.write();
      break;
    }
  }

  if (found) {
   return res.send("Found title: " + title );
  }
  else {
    res.status(500).json({
      status: error
    });
  }

});


module.exports = router;
