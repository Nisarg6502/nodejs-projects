//file which will host the socket io 

const io = require("socket.io")(8000)

const users = {};

io.on('connection', socket => { //io.on listens to several socket connections
    console.log('a user connected');
    socket.on('new-user-joined', person => { //accepts an event 'new-user-joined' 
        console.log('New user', person)
        users[socket.id] = person;
        socket.broadcast.emit('user-joined', person)
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, person: users[socket.id] })
    });
})

console.log("Hello")