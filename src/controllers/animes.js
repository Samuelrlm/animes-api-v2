const { Animes } = require("../models")
const redis = require("../config/redis")

async function createAnime(req, res){
    try {
        const anime = await Animes.create(req.body)
        return res.status(201).send(anime)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

async function getAnimes(req, res){
    try {
        const cacheKey = "animes"
        
        const cachedData = await redis.get(cacheKey)

        if(cachedData){
            return res.send(JSON.parse(cachedData))
        }

        const animes = await Animes.findAll()

        await redis.set(cacheKey, JSON.stringify(animes), {EX: 60} )

        return res.send(animes)
    } catch (error) {
        return res.status(500).send({
            error: error.message
        })
    }
}

module.exports = {
    createAnime,
    getAnimes
}