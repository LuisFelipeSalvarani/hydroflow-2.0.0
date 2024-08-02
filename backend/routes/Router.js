const express = require("express")
const router = express()

router.use("/api/users", require("./UserRoutes"))
router.use("/api/gardens", require("./GardenRoutes"))
router.use("/api/devices", require("./DeviceRoutes"))
router.use("/api/parameters", require("./ParametersRoutes"))

router.get("/", (req, res) => {
    res.send("API Trabalhando!")
})

module.exports = router