const express = require("express");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrl.signUp);

router.post("/signin", ctrl.signIn);

router.get("/signout", ctrl.signOut);

router.get("/current", ctrl.getCurrent);

module.exports = router;
