require("dotenv").config()

const express = require("express")
const path = require("path")
const cors = require("cors")

const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(cors({credentials: true, origin: "http://localhost:5173"}))

// Conexão com DB
require("./config/db")

const router = require("./routes/Router")

app.use(router)

app.listen(port, () => {
    console.log(`App rodando na porta ${port}`)
})