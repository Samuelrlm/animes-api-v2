const express = require("express")
const animesRoutes = require("./routes/animes")
const usersRoutes = require("./routes/users")
const authRoutes = require("./routes/auth")
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use(animesRoutes);
app.use(usersRoutes);
app.use(authRoutes);

module.exports = app;