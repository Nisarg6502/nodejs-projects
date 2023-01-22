//file which will host the socket io 

const io = require("socket.io")(8000)

const users = {};

io.on('connection', socket => { //io.on listens to several socket connections
    socket.on('new-user-joined', name => { //accepts an event 'new-user-joined' 
        console.log('New user', name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name) //server broadcasts an event named user-joined for clients
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })//server broadcasts event receive for the users
    });
})
