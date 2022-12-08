const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    uuid:{
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true,
      
    },
    fullName:{
        type: String,
        required:true,
        
    },
    admin:{
        type: Boolean,
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

module.exports = mongoose.model('usuario', userSchema)