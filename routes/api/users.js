const express = require("express");
const auth = require("../../middelwares/auth");
const upload = require("../../middelwares/upload");
const resizeAvatar = require("../../middelwares/resizeAvatar");

const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrl.signUp);

router.post("/signin", ctrl.signIn);

router.get("/signout", auth, ctrl.signOut);

router.get("/current", auth, ctrl.getCurrent);

router.patch("/", auth, ctrl.updateSubscription);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  resizeAvatar,
  ctrl.updateAvatar
);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

module.exports = router;
