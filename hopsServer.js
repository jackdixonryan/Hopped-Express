const express= require('express');
const app = express();
const PORT = 8080;
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

let file;

let hops = [];
console.log(hops);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));


fs.readFile('hops.json', 'utf-8', function(err, cont){
    file = JSON.parse(cont);
    if (err) throw err;
});

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, 'main.html'));
});

app.get('/api/hops', function(req, res){
    return res.json(file);
});

app.get('/api/hops/:hop', function(req, res){
    let query = req.params.hop;
    for (let i = 0; i < file.search.length; i++){
        if ((file.search[i].name).toLowerCase() == query){
            console.log('found', query, 'in the json.');
            return res.json(file.search[i]);
        }
    }
    return console.log('That\'s a 404'), res.end();
});

app.post('/api/hops', function(req, res){
    let newHop = req.body; 
    hops.push(newHop);
    console.log(hops);
    res.json(newHop);
});

app.listen(PORT, function(){
    console.log('App listening on PORT ' + PORT);
});

