var express = require('express');
var morgan = require('morgan');
var request = require('request');

var auth_url = "https://runkeeper.com/apps/authorize";
var auth_token_url = "https://runkeeper.com/apps/token";
var deauth_url = "https://runkeeper.com/apps/de-authorize";

var CLIENT_ID = "b101f00fa9f142a2a17d73bdd84499e6";
var CLIENT_SECRET = "9f6521ab4dc94ec9b11aedf66bab6809";

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(morgan('dev'));
app.use(express.static(__dirname + "/../webapp"));

app.get("/code", function(req, res){
    console.log("/code " + req.params);

    // request.post(auth_token_url + "?...=...", function(response){
    //     console.log("")
    // });

    res.send("the code...");
});

app.get("/disconnect", function(req, res){

});

app.listen(app.get('port'));
