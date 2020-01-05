const express = require('express');
const bodyParser = require("body-parser");
const request = require("request")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){
  var body = JSON.stringify(req.body);
  var URL =
  request(
    { method: "POST"
    , uri: "https://548ag3a1w3.execute-api.eu-west-1.amazonaws.com/test/logintest"
    , body: body
        }
    , function(error, response, body){
        console.log(response.body);
      });
});

app.get("/jsgame", function(req, res){
  res.sendFile(__dirname + "/jsgame.html")
});

app.listen(3000, function(){
  console.log("server started on port 3000");
});
