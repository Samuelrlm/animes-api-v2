const jwt = require("jsonwebtoken");
const { Users } = require("../models");
require("dotenv").config();

async function validateToken(req, res, next){
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).send("Token não fornecido")
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await Users.findOne({
            where: {
                id: decoded.id
            }
        })

        if(!user){
            return res.status(401).send("Token inválido")
        }
        
        req.user = user;

        next()
    } catch (error) {
        return res.status(401).send("Token inválido")
    }
}

module.exports = {
    validateToken
}