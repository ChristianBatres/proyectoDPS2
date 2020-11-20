'use strict'

var mongoose = require('mongoose');
var app= require('./app');
var port= process.env.PORT || 3977;

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/proyectodps', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('conectado a base de datos')
        app.listen(port, function(){
            console.log("Servidor api rest de musica esta escuchando en http://localhost:"+port);
        });
    }
});