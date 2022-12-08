const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    uuid:{
        type: String,
        required:true,
        unique:true
    },
    name:{
        type: String,
        required:true,
        unique:true
    },
    price:{
        type: Number,
        required:true,
      
    },
    thumbnails:{
        type: String,
        required:true,
        
    },
    stock:{
        type: Number,
        required:true,
        default: false
    },
    //la data que devuelve este atributo, podemos copipastearlo en timeStamp converter y ver realmente cual fecha es
    creationTimestamp:{
        type: Number,
        required:true,
        default: parseInt(Date.now() / 1000)
        
    },
})

module.exports = mongoose.model('product', productSchema)