// Dependency
// This the path package that gives the correct file path fo the html
const path = require('path');


module.exports = function (app) {

    // Get requests
    app.get('/notes', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'));
      });

    //If route doesnt match it defaults to the index file
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../public/notes.html'));
    });

};