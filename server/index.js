var express = require('express'),
    http = require('http');

var allowCrossDomain = function(req, res, next) {
    var oneof = false;
    if(req.headers.origin) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Expose-Headers', 'Content-Range');
        oneof = true;
    }
    if(req.headers['access-control-request-method']) {
        res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
        oneof = true;
    }
    if(req.headers['access-control-request-headers']) {
        res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
        oneof = true;
    }
    if(oneof) {
        res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
    }

    // intercept OPTIONS method
    if (oneof && req.method == 'OPTIONS') {
        res.send(200);
    }
    else {
        next();
    }
};

var app = express()
    .use(allowCrossDomain)
    .use(express.static('app'));

app.get('/', function  (req, res) {
    res.json(404, {status: 'not found'});
});


app.get('/*', function  (req, res) {
    res.json(404, {status: 'not found'});
});

http.createServer(app).listen(5000, function () {
    console.log("Server ready at http://localhost:5000");
});
