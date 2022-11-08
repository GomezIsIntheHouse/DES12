const express = require('express')
const {Server: HttpServer} = require('http')
const {Server: IoServer}= require('socket.io')
require('dotenv').config()
 
const messages = [];

const app = express();

const http = new HttpServer(app);

const io = new IoServer(http);

app.use(express.static(__dirname + '/public'));

app.get('/healt', (_req,res)=>{
        res.status(200).json({
            success:true,
            enviroment:process.env.ENVIROMENT || 'undefined',
            health:'up'
        })
})

app.get('/',(_req,res)=>{
    res.sendFile('login', {root:_dirname})
})

const PORT = process.env.PORT;

http.listen(PORT, ()=>console.log(`Server up and running on port ${PORT}`))

io.on('connection', (socket)=>{
    console.info('Nuevo cliente conectado')
    socket.emit('UPDATE_DATA', messages);
    socket.on('NEW_MESSAGE_TO_SERVER', data => {
        
        messages.push(data)
        console.info(messages)

        io.sockets.emit('NEW_MESSAGE_FROM_SERVER', data );
    })

    
})