const express = require("express");
const { auth } = require("../../middelwares/auth");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrl.signUp);

router.post("/signin", ctrl.signIn);

router.get("/signout", auth, ctrl.signOut);

router.get("/current", auth, ctrl.getCurrent);

module.exports = router;
