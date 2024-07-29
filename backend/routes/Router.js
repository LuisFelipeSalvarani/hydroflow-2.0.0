const express = require("express")
const router = express()

router.use("/api/users", require("./UserRoutes"))
router.use("/api/gardens", require("./GardenRoutes"))

router.get("/", (req, res) => {
    res.send("API Trabalhando!")
})

module.exports = router