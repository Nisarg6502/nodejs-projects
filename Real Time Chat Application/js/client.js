const socket = io('http://localhost:8000', { transports: ['websocket'] });
//Telling the socketio client to only use websocket does the trick
//https://stackoverflow.com/a/48593746/16131596

const form = document.getElementById('send-container');
const msgInp = document.getElementById('msgInp');
const msgContainer = document.querySelector(".container")

const person = prompt("Enter your name to join");
socket.emit('new-user-joined', person)

console.log("Client");