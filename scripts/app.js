
const username = localStorage.getItem('username')? localStorage.getItem('username') : 'anonymous';
const newName = document.querySelector('.new-name');
const updatMsg = document.querySelector('.update-mssg');
const rooms = document.querySelector('.chat-rooms');
const list = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');


newChatForm.addEventListener('submit', function(e){
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message);
    newChatForm.reset();
})
list.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');
        chatroom.deleteChat(id);
        e.target.parentElement.remove();
    }
})
rooms.addEventListener('click', function(e){
    const room = e.target.getAttribute('id');
    chatUI.clear();
    chatroom.updateRoom(room);
    chatroom.getChat(function(data, id){
        chatUI.render(data, id);
    });
})
newName.addEventListener('submit', function(e){
    e.preventDefault();
    const username = newName.name.value.trim();
    chatroom.updateName(username);

    let html = `Your username changed to <strong>${username}</strong>`;
    updatMsg.innerHTML = html;

    newName.reset();
})

const chatroom = new Chatroom('general',username);
chatroom.getChat(function(data, id){
    chatUI.render(data, id);
});

const chatUI = new ChatUI(list);
