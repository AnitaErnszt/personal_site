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
    , uri: "https://tqs4p71lt4.execute-api.eu-west-1.amazonaws.com/dev/auth/login"
    , body: body
        }
    , function(error, response, body){
        console.log(response.body);
      });
    res.send("This bit is still under development.");
});

app.get("/jsgame", function(req, res){
  res.sendFile(__dirname + "/jsgame.html")
});

app.get("/register", function(req, res){
  res.sendFile(__dirname + "/register.html")
});

app.post("/register", function(req, res){
  var body = JSON.stringify(req.body);
  var URL =
  request(
    { method: "POST"
    , uri: "https://tqs4p71lt4.execute-api.eu-west-1.amazonaws.com/dev/auth/register"
    , body: body
        }
    , function(error, response, body){
        console.log(response.body);
      });
    res.send("This bit is still under development.");
});

app.listen(80, function(){
  console.log("server started on port 80");
});
