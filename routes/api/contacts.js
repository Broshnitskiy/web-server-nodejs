const express = require("express");
const { auth } = require("../../middelwares/auth");

const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", auth, ctrl.getAllContacts);

router.get("/:id", ctrl.getContactById);

router.post("/", auth, ctrl.addContact);

router.delete("/:id", ctrl.deleteContact);

router.put("/:id", ctrl.updateContact);

router.patch("/:id/favorite", ctrl.updateFavoriteProp);

module.exports = router;
