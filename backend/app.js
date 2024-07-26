require("dotenv").config()

const express = require("express")
const path = require("path")

const port = process.env.PORT

const app = express()

require("./config/db")

const router = require("./routes/Router")

app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})