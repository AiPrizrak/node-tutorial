const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerPartials(__dirname + '/veiws/header');

app.set('view engine', 'hbs');
app.use((req,res,next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append server log');
        }
    });
    console.log(log);
    next();
});
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})
app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    // res.send('Hello Express!');
    res.render('home.hbs', {
        pageTitle: 'Hello!',
        welcomeMessage: 'Welcome to brand new server of a brand new node user',
        });
});
app.use((req,res,next) => {
    // res.send('Hello Express!');
    res.render('maintaines.hbs', {
        pageTitle: 'Repair works',
        //welcomeMessage: 'Welcome to brand new server of a brand new node user',
        });
});
app.get('/about', (req, res) =>{
    res.render('about.hbs', {
        pageTitle: 'About Page',
        });

});
app.get('/bad', (req,res) => {
    res.send({
        errorMessage: 'You are trying to enter unexisting page'
        
    });
});

app.listen(port, () => console.log(`App is up on port ${port}`));