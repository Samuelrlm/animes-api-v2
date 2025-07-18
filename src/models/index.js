const sequelize = require("../config/database");
const Animes = require("./animes");
const Users = require("./users")
const Favorites = require("./favorites")

sequelize.sync({ alter: true })
    .then(() => console.log("Tabelas sincronizadas com sucesso"))
    .catch((error) => console.error("Erro ao sincronizar", error))

module.exports = {
    Animes,
    Users,
    Favorites
}