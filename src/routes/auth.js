const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const middlwareValidate = require("../middlewares/validate")

router.post("/login", authController.login)

router.get(
    "/profile", 
    middlwareValidate.validateToken,
    authController.profile
)

module.exports = router