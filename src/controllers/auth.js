const { Users } = require("../models")
const bcrypt = require("bcrypt")
const jwt =  require("jsonwebtoken")
require("dotenv").config()

const secret = process.env.PASS_SECRET

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

        const match = await bcrypt.compare(password + secret, user.password)

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

module.exports = {
    login
}