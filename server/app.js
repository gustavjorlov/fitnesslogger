var express = require('express');
var morgan = require('morgan');
var request = require('request');
var querystring = require('querystring');

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
    console.log("/code ", querystring.parse(req.url));
    var auth_code = getCodeFromUrl(req.url);

    console.log("auth_code", auth_code);

    // request.post(auth_token_url + "?...=...", function(response){
    //     console.log("")
    // });

    res.send("the code...");
});

var getCodeFromUrl(url){
    var qs = querystring.parse(url);
    var key = Object.keys(qs);
    return qs[key[0]];
}

app.listen(app.get('port'));
