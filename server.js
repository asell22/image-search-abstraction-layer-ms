var express = require('express');
var app = express();
var request = require('request');
require('dotenv').config();


app.use(express.static('public'));

app.get('/api/imagesearch/:query', function(req, res) {
    var imageJSON = []
    var query = req.params.query;
    var offset = req.query.offset || 1;
    request('https://www.googleapis.com/customsearch/v1?start='+offset+'&key='+process.env.API_KEY+'&cx='+process.env.ENGINE_ID+'&q='+query+'&searchType=image&fileType=jpg&alt=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body);
            body.items.forEach(function(image) {
                var imageObj = {};
                imageObj.url = image.link;
                imageObj.snippet = image.snippet;
                imageObj.thumbnail = image.image.thumbnailLink;
                imageObj.context = image.image.contextLink;
                imageJSON.push(imageObj);
            });
        }
         res.send(imageJSON);
    });
   
});

app.listen(process.env.PORT, process.env.IP, function() {
   console.log('server running on', process.env.PORT); 
});