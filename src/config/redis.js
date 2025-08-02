const { createClient } = require('redis');
require("dotenv").config();

const redisClient = createClient({
    url: process.env.REDIS_URL
})

redisClient.on('error', (err) => {
    console.log("Erro ao conectar no Redis", err)
})

redisClient.connect()
    .then(() => console.log("Redis conectado com sucesso"))
    .catch(console.error)

module.exports = redisClient;
