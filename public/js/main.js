const createUserBtn = document.getElementById('create-user');
const username = document.getElementById('username');
const allusersHtml = document.getElementById('allusers');
const socket = io()



const PeerConnection = (function () {

    let PeerConnection;
    const createPeerConnection = () => {
        const peerConnection = new RTCPeerConnection({
            iceServers: [
                {
                    urls: "stun:stun1.l.google.com:19302",
                },
                {
                    urls: "stun:stun2.l.google.com:19302",
                },
            ],
        });
        return peerConnection
    }
    return {
        getInstance: () => {
            if (!PeerConnection) {
                PeerConnection = createPeerConnection()
            }
            return PeerConnection;
        }
    }
})

createUserBtn.addEventListener('click', async (e) => {
    if (username.value !== '') {
        const usernameContainer = document.querySelector('.username-input');


        socket.emit('join-user', username.value)
        usernameContainer.style.display = 'none';
    }
})



socket.on('user-joined', (users) => {



    const createUsersHtml = () => {
        allusersHtml.innerHTML = "";

        for (const key in users) {
            const userObj = users[key];
            const user = userObj.username;

            const li = document.createElement("li");


            li.textContent = `${user} ${user === username.value ? "(You)" : ""}`;


            if (user !== username.value) {
                const button = document.createElement("button");
                button.classList.add("call-btn");
                button.addEventListener("click", (e) => {
                    startCall(user);
                });
                const img = document.createElement("img");
                img.setAttribute("src", "/image/phone.png");
                img.setAttribute("width", 20);

                button.appendChild(img);

                li.appendChild(button);
            }


            allusersHtml.appendChild(li);
        }
    }
    createUsersHtml()
})


const startCall = (user) => {

}

const startMyVideo = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    console.log(stream);


}
startMyVideo()