function validateMessage(req, res, next){
    const { content, groupId } = req.body;
    const user = req.user;

    if(!content || !groupId){
        return res.status(400).send({
            error: "content e groupId são obrigatórios"
        })
    }

    if(typeof content !== "string"){
        return res.status(400).send({
            error: "content deve ser uma string"
        })
    }

    if(typeof groupId !== "number"){
        return res.status(400).send({
            error: "groupId deve ser um número"
        })
    }

    req.body.senderId = user.id;
    next();
}

function validateGetMessages(req, res, next){
    const { groupId } = req.params;

    if(!groupId){
        return res.status(400).send({
            error: "groupId é obrigatório"
        })
    }

    next();
}

module.exports = {
    validateMessage,
    validateGetMessages
}