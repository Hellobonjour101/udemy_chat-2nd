class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chat = db.collection('chats');
        this.unsub;
    }
    getChat(callback){
        this.unsub = this.chat
        .where('room', '==', this.room)
        .orderBy('created_at')
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                // console.log(change.doc.id);
                if(change.type === 'added'){
                    const data = change.doc.data();
                    const id = change.doc.id;
                    callback(data,id);
                }
            });
        })
    }
    addChat(message){
        const now = new Date();
        const chat = {
        message: message,
        username: this.username,
        room: this.room,
        created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        this.chat.add(chat);
    }
    deleteChat(id){
        this.chat.doc(id).delete().then(() => console.log('chat deleted'));
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username', this.username);
    }
    updateRoom(room){
        this.room = room;
        // console.log(this.room);
        if(this.unsub){
            this.unsub();
          }
    }
}