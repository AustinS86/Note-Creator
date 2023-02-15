const express = require('express');

const apiRoute = require('./route/apiRoute');
const htmlRoute = require('./route/htmlRoute');

const app = express();
const PORT = process.env.PORT || 5500;


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static('public'));
app.use('/api',apiRoute);
app.use('/', htmlRoute);

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`)
});