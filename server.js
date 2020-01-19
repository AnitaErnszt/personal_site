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
  res.render("contact");
});

app.post("/contact", function(req, res){
  var body = JSON.stringify(req.body);
  console.log(body);
  request(
    { method: "POST"
    , uri: "https://tqs4p71lt4.execute-api.eu-west-1.amazonaws.com/dev/contact-email"
    , body: body
        }
    , function(error, response, body){
        res.render("other", {"title": "Success!", "message": "Your message has been sent! I aim to get back to you within 24 hours."})
      });
});

app.get("/inprogress", function(req, res){
  res.render("inprogress");
});

app.get("/snippets", function(req, res){
  res.render("snippets");
});

app.get("/snippets/email", function(req, res){
  res.render("email");
});

app.get("/game", function(req, res){
  res.render("game");
});

app.post("/game", function(req, res){
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

app.listen(80, function(){
  console.log("server started on port 80");
});
