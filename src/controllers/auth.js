const { Users } = require("../models")
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken")
require("dotenv").config()

async function login(req, res){
    try {
        const { email, password } = req.body

        const user = await Users.findOne({
            where: {
                email: email
            }
        })

        if(!user){
            return res.status(404)
                .send("User not found")
        }

        const match = await bcrypt.compare(password, user.password)

        if(!match){
            return res.status(401)
                .send("Invalid password")
        }

       const token = jwt.sign(
        {id: user.id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN}
       )

       return res.send({
        accessToken: token
       })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Erro ao fazer login")
    }
}

async function validateToken(req, res){
    try {
        const token = req.headers.authorization

        if(!token){
            return res.status(401)
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Users.findOne({
            where: {
                id: decoded.id
            }
        })

        if(!user){
            return res.status(401)
                .send("User not found")
        }

        return res.send({
            id: user.id,
            email: user.email
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send("Erro ao validar token")
    }
}

module.exports = {
    login,
    validateToken
}