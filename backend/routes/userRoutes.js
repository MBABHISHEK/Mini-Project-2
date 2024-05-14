const express = require("express")

const imageUpload = require("../helpers/Libraries/imageUpload")

const {profile, editProfile, changePassword} = require("../controllers/userController")

const { getAccessToRoute } = require("../middlewares/authorization/auth")

const router = express.Router()

router.get("/profile", getAccessToRoute, profile)

router.post("/editProfile", [getAccessToRoute, imageUpload.single("photo")], editProfile)

router.post("/changePassword", getAccessToRoute, changePassword)

module.exports = router