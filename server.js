const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    console.log(req);
    var now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('could not append to the file');
        }
    });
    next();
});

app.get('/', (req, res) => {
    res.send('hello express');
})

app.get('/about', (req, res) => {
    res.render('about.hbs');
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});