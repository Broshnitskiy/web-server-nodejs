const express = require("express");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrl.signup);

router.post("/signin", ctrl.signin);

router.get("/signout", ctrl.signout);

router.get("/current", ctrl.getCurrent);

module.exports = router;
