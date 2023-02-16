const { json } = require('body-parser');
const fs = require('fs');

module.exports =  (app) => {
    app.get('/api/notes', function(req,res){
        fs.readFile('/db/db.json', (err,data)=>{
            if (err) throw err;
            dbData = JSON.parse(data);
            res.send(dbData);
        });
    });

    app.post('/api/notes', function(req,res){
        const userNote =req.body;

        fs.readFile('/db/db.json', (err,data) =>{
            if (err) throw err;
            dbData = JSON.parse.apply(data);
            dbData.push(userNote);
            let number =1;
            dbData.forEach((note,index)=>{
                note.id = number;
                number++;
                return dbData;
            });
            console.log(dbData);
            stringData = JSON.stringify(dbData);
            fs.watchFile('./db/db.json', stringData, (err, data)=>{
                if (err) throw err;

            });
       });
       res.send('Your note is saved!');
    });

    
}
    
