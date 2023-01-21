//file which will host the socket io 

const io = require("socket.io")(8000)

const users = {};

io.on('connection', socket => { //io.on listens to several socket connections
    socket.on('new-user-joined', name => { //accepts an event 'new-user-joined' 
        users[socket.id] = name;
        socket.broadcast.emit(`user-joined`, name)
    });

    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    });
})