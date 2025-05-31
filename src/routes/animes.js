const express = require("express");
const router = express.Router();
const middlewareAnimes = require("../middlewares/animes");
const controllerAnimes = require("../controllers/animes");

router.post(
    "/animes", 
    middlewareAnimes.validateCreateAnime, 
    controllerAnimes.createAnime
)

module.exports = router;