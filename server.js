var express = require('express');

var app = express();

var bodyParser = require('body-parser');

var fs = require("fs");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

var mysql = require("mysql");

var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cnm12345",
  database: "moviestore"
});

conn.connect(function(err){
  if(err){
    console.log("Error connecting to DB");
    return;
  }
  console.log("Connection Successful");
  console.log(new Date("4-Feb-1971"));
});

//SOLR CONNECTION
var solr = require('solr-node');

var solr_conn = new solr({
  host: '127.0.0.1',
  port: '8983',
  core: 'moviestore_item',
  protocol: 'http'
});

app.use(express.static('.'));

app.get('/', function(req,res){
  res.sendFile( __dirname + "/" + "index.html" );
})

app.get('/movies/getMovies', function(req,res) {
  conn.query("select * from item", function(err, rows){
    //console.log(rows[1]);
    res.end(JSON.stringify(rows));
  });
})

app.get('/movies/genre/:genre_name', function(req,res){
  console.log('genre:',req.params.genre_name);
  var query = 'q='+req.params.genre_name+':1&sort=rating+desc&rows=6&wt=json';
  solr_conn.search(query, function(err, result){
    if(err){
      console.log(err);
      return;
    }
    console.log('printing from API:');
    console.log(result);
    res.end(JSON.stringify(result.response.docs));
  });
})

// This responds a POST request for the homepage
app.post('/gems/deleteGem', urlencodedParser, function (req, res) {
   var id = req.body.id;
   fs.readFile(__dirname + '/' + 'gems.json', 'utf8', function(err,data){
     data = JSON.parse(data);
     delete data["gem" + id];
     console.log(data);
     res.end(JSON.stringify(data));
   });
})

app.post('/gems/addGem', urlencodedParser, function (req, res) {
  gem = {
    name: "Azurite",
    description: "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
    shine: 8,
    price: 110.50,
    rarity: 7,
    color: "#CCC",
    faces: 14,
    images: [
      "img/gem-02.gif",
      "img/gem-05.gif",
      "img/gem-09.gif"
    ],
    reviews: [{
      stars: 5,
      body: "I love this gem!",
      author: "joe@thomas.com",
      createdOn: 1397490980837
    }, {
      stars: 1,
      body: "This gem sucks.",
      author: "tim@hater.com",
      createdOn: 1397490980837
    }]
  };
  console.log(user);
  fs.readFile(__dirname + '/' + 'gems.json', 'utf8', function(err,data){
    data = JSON.parse(data);
    data["gem4"] = gem;
    res.end(JSON.stringify(data));
  });
})

var server = app.listen(8000, function(){
  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s",host,port)
})
