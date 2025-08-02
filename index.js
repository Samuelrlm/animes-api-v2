require('./src/models')
require("./src/config/sentry")
const Sentry = require("@sentry/node")
const http = require("http")
const app = require("./src/app")
const { Server } = require("socket.io")
const chatSocket = require("./src/sokcets/chat")

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})
io.on("connection", (socket) => {
    console.log(`Novo usuário conectado: ${socket.id}`)

    chatSocket(io, socket)

    socket.on("disconnect", () => {
        console.log(`Usuário desconectado: ${socket.id}`)
    })
})

const port = 6780;


Sentry.setupExpressErrorHandler(app);


server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})