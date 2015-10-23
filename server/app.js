var express = require('express');
var morgan = require('morgan');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.use(morgan('dev'));

app.get("/user", function(req, res){
    res.json({'gustav': 'jorlöv'});
});

app.listen(app.get('port'));
