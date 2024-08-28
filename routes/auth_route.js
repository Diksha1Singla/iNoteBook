const express = require("express");
const router = express.Router()
const authcontroller = require("../controllers/auth_controller");
const schemaStructure = require("../validator/auth_validator");
const validate = require("../middleWare/validateMiddleWare")

router.route("/register").post(validate(schemaStructure),authcontroller.register)
router.route("/login").post(authcontroller.login)
router.route("/fetchUser").get(authcontroller.fetchUser)
// router.route("/details").get(authcontroller.details)

module.exports = router