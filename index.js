
import express from "express"
import cors from "cors"
import { createServer } from "http"
import { Server } from "socket.io"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const allUsers = {}

const app = express();
const server = createServer(app);
const io = new Server(server);


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


app.use(express.json())
app.use(cors({ origin: "*", methods: ["GET", "POST", "PUT", "DELETE"] }))
app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))
app.get("/", (req, res) => {

    res.sendFile(join(__dirname, "/app/index.html"))
})

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on("join-user", (username) => {
        console.log(username)
        allUsers[username] = { username, id: socket.id }
        io.emit("user-joined", allUsers)
    })
})

server.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000")
})