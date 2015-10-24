var express = require('express');
var morgan = require('morgan');
var request = require('request');
var querystring = require('querystring');

var auth_url = "https://runkeeper.com/apps/authorize";
var auth_token_url = "https://runkeeper.com/apps/token";
var deauth_url = "https://runkeeper.com/apps/de-authorize";
var base_api_url = "https://api.runkeeper.com";

var CLIENT_ID = "b101f00fa9f142a2a17d73bdd84499e6";
var CLIENT_SECRET = "9f6521ab4dc94ec9b11aedf66bab6809";
var ACCESS_TOKEN = "";

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(morgan('dev'));
app.use(express.static(__dirname + "/../webapp"));

app.get("/home", function(req, res){
    res.send("access_token: " + ACCESS_TOKEN);
});

app.get("/user", function(req, res){
    var options = {
        url: base_api_url + "/user",
        headers: {
            "authorization": "Bearer " + ACCESS_TOKEN,
            "accept": "application/vnd.com.runkeeper.User+json"
        }
    };
    request.get(options, function(err, response, body){
        console.log(err, body);
        res.send(body);
    });
});

app.get("/fitness", function(req, res){
    var options = {
        url: base_api_url + "/fitnessActivities",
        headers: {
            "authorization": "Bearer " + ACCESS_TOKEN,
            "accept": "application/vnd.com.runkeeper.FitnessActivityFeed+json"
        }
    };
    request.get(options, function(err, response, body){
        console.log(err, body);
        res.send(body);
    });
});

app.get("/data/:type", function(req, res){
    var options = {
        url: base_api_url + "/" + req.params.type,
        headers: {
            "authorization": "Bearer " + ACCESS_TOKEN
        }
    };
    request.get(options, function(err, response, body){
        console.log(err, body);
        res.send(body);
    });
});

app.get("/code", function(req, res){
    var auth_code = getCodeFromUrl(req.url);

    request.post({
        url: auth_token_url,
        form: {
            grant_type: 'authorization_code',
            code: auth_code,
            client_id: CLIENT_ID,
            client_secret: CLIENT_SECRET,
            redirect_uri: "https://fitnesslogger.herokuapp.com/code"
        }
    }, function(e, r, body){
        if(e){
            console.log(":(");
            res.send(":(");
        }else{
            console.log(body);
            res.send(":)");
            ACCESS_TOKEN = JSON.parse(body).access_token;
        }
    });
});

function getCodeFromUrl(url){
    var qs = querystring.parse(url);
    var key = Object.keys(qs);
    return qs[key[0]];
}

app.listen(app.get('port'));
