const express = require("express")
const router = express.Router()
const middlewareMessages = require("../middlewares/messages")
const controllerMessages = require("../controllers/messages")
const middlewareValidate = require("../middlewares/validate")

router.post(
    "/messages",
    middlewareValidate.validateToken,
    middlewareMessages.validateMessage,
    controllerMessages.createMessage
)

router.get(
    "/messages/:groupId",
    middlewareValidate.validateToken,
    middlewareMessages.validateGetMessages,
    controllerMessages.getMessages
)

module.exports = router;