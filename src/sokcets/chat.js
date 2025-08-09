const { Messages } = require("../models")
const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = (io, socket) => { 
    socket.on("joinGroup", (groupId) => {
        socket.join(groupId)
        console.log(`O usuário ${socket.id} ingressou no grupo ${groupId}`)
    })
    socket.on("sendMessage", ({ groupId, message, sender }) => {
        const payload = {
            sender,
            message,
            timestamp: new Date().toISOString()
        }

        socket.to(groupId).emit("receiveMessage", payload)

        //opcional
        socket.emit("receiveMessage", payload)
    })
}