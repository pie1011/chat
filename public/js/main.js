const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// Get username and room from url using qs
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

const socket = io();


// Join chatroom
socket.emit('joinRoom', { username, room });

// Show room info
socket.on('roomUsers', ({ room, users }) => {
    outputRoomName(room);
    outputUsers(users)
})

// Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    // Scroll down automatically
    chatMessages.scrollTop = chatMessages.scrollHeight;

})

// Message submit event listener
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // msg is element id, and we need value
    const msg = e.target.elements.msg.value;

    // Emit message
    socket.emit('chatMessage', msg);

    // Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
    

});

// Output message to DOM
function outputMessage(message) {

    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `
        <div class="user-bubble">
            <p class="meta">${message.username} <span>${message.time}</span></p>
        </div>
        <p class="text">
            ${message.text}
        </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to DOM
function outputRoomName(room) {
    roomName.innerText = room;
}

function outputUsers(users) {
    userList.innerHTML = `
    ${users.map(user => `<li>${user.username}</li>`).join('')}`;
}


