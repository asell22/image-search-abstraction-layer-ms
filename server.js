var express = require('express');
var app = express();
var request = require('request');

app.listen(process.env.PORT, process.env.IP, function() {
   console.log('server running on', process.env.PORT); 
});