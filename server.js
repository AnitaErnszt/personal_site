const express = require('express');
const bodyParser = require("body-parser");
const request = require("request")

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("home");
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
          res.redirect("/inprogress");
        } else {
          res.redirect("/inprogress");
        }}
      });
});

app.get("/about", function(req, res){
  res.render("about");
});

app.get("/cv", function(req, res){
  res.render("inprogress");
});

app.get("/hobbies", function(req, res){
  res.render("hobbies");
});

app.get("/contact", function(req, res){
  res.render("inprogress");
});

app.get("/inprogress", function(req, res){
  res.render("inprogress");
});

app.get("/games", function(req, res){
  res.sendFile(__dirname + "/public/jsgame.html")
});

// app.get("/game", function(req, res){
//   res.render("game");
// });

app.post("/games", function(req, res){
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
  res.render("register");
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
          res.redirect("/inprogress");
        } else {
          res.redirect("/inprogress");
        }}
      });
});

app.listen(3000, function(){
  console.log("server started on port 3000");
});
