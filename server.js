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
  request(
    { method: "POST"
    , uri: "https://tqs4p71lt4.execute-api.eu-west-1.amazonaws.com/dev/auth/login"
    , body: body
        }
    , function(error, response, body){
        if (error){
          res.send("There was an issue processing your request")
        } else {
          var apiResponse = JSON.parse(response.body)
          if (apiResponse.status === "success"){
          res.send(apiResponse.data.user);
        } else {
          res.send(apiResponse.error);
        }}
      });
});

app.get("/jsgame", function(req, res){
  res.sendFile(__dirname + "/jsgame.html")
});

app.post("/jsgame", function(req, res){
  var body = JSON.stringify(req.body);
  console.log("submit player data")
  request(
    { method: "POST"
    , uri: "https://tqs4p71lt4.execute-api.eu-west-1.amazonaws.com/dev/game/addgame"
    , body: body
        }
    , function(error, response, body){
        if (error){
          res.send("There was an issue processing your request")
        } else {
          var apiResponse = JSON.parse(response.body);
          res.send(apiResponse);
        }
      });
});

app.get("/register", function(req, res){
  res.sendFile(__dirname + "/register.html")
});

app.post("/register", function(req, res){
  var body = JSON.stringify(req.body);
  request(
    { method: "POST"
    , uri: "https://tqs4p71lt4.execute-api.eu-west-1.amazonaws.com/dev/auth/register"
    , body: body
        }
    , function(error, response, body){
        if (error){
          res.send("There was an issue processing your request")
        } else {
          var apiResponse = JSON.parse(response.body)
          if (apiResponse.status === "success"){
          res.send(apiResponse.data.user);
        } else {
          res.send(apiResponse);
        }}
      });
});

app.listen(3000, function(){
  console.log("server started on port 3000");
});
