class ChatUI{
    constructor(list){
        this.list = list;
    }
    render(data, id){
        // console.log(data);
        const time = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix:true}
        )
        const html = `
        <li class="list-group-item" data-id="${id}">
            <span>${data.username}</span>
            <span>${data.message}</span>
            <button class="deleteBtn btn btn-sm btn-danger">delete</button>
            <div>${time}</div>
        </li>
        `;
        this.list.innerHTML += html;
    }
    clear(){
        this.list.innerHTML = '';
    }
}