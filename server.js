var express = require('express');
var app = express();
var request = require('request');
require('dotenv').config();

app.use(express.static('public'));

app.get('/api/imagesearch/:query', function(req, res) {
    var query = req.params.query;
    console.log('**********', query);
    request('https://www.googleapis.com/customsearch/v1?start=11&key='+process.env.API_KEY+'&cx='+process.env.ENGINE_ID+'&q='+query+'&searchType=image&fileType=jpg&alt=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            console.log(body.items); // Show the HTML for the Google homepage. 
        }
    });
    res.send();
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log('server running on', process.env.PORT); 
});