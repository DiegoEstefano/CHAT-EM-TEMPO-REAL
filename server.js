const express = require('express');
const path = require ('path');

const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join (__dirname, 'public') );
app.engine('html', require('ejs').renderFile );
app.set('view engine' , 'html');

app.use('/', (req, res) =>{
    res.render('index.html')
} )

let messages = [];

io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.emit('previousMessages', messages)

    socket.on('sendMessage' ,  data => {
       messages.push(data);
       socket.broadcast.emit('receivedMessage', data)
    });
});

let port = 3000;
let ip = "192.168.15.78"; /*put the ip that you want*/ 

server.listen(3000,"192.168.15.78", console.log( `Server rodando no ip ${ip} e porta ${port}`));
