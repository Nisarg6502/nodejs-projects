const socket = io('http://localhost:8000', { transports: ['websocket'] });
//Telling the socketio client to only use websocket does the trick
//https://stackoverflow.com/a/48593746/16131596

const form = document.getElementById('send-container');
const msgInp = document.getElementById('msgInp');
const msgContainer = document.querySelector(".container")

//append function
const append = (message, position) => {
    const messageElement = document.createElement('div')//creating message sub div for container
    messageElement.innerText = message
    messageElement.classList.add('message')
    messageElement.classList.add(position)
    msgContainer.append(messageElement)
}

form.addEventListener('submit', (e) => {
    e.preventDefault() //prevents default function from taking place. In this case prevents reloading after form submits
    const message = msgInp.value
    append(`You: ${message}`, 'm-right')//appending on the website
    socket.emit('send', message)//client sends to server
    msgInp.value = ''
})

const person = prompt("Enter your name to join");
socket.emit('new-user-joined', person)

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'm-left')
})

socket.on('receive', data => {
    append(`${data.name}: ${data.message} `, 'm-left')
})

socket.on('left', name => {
    append(`${name} left the chat`, 'm-left')
})