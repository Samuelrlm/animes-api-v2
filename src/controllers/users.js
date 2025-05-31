const { Users } = require("../models")
const bcrypt = require("bcrypt")
require("dotenv").config()

const secret_key = process.env.PASS_SECRET

async function createUser(req, res) {
    try {
        const hashPassword = await bcrypt.hash(req.body.password + secret_key, 10)
        req.body.password = hashPassword
        const newUser = await Users.create(req.body)

        return res.status(201).send(newUser)
    } catch (error) {
        return res.status(500).send("Erro ao criar user", error.message)
    }
}

module.exports = {
    createUser
}
