const express = require("express");
const router = express.Router();

const { itemController } = require("../../controllers");

router.get("/", itemController.getAllItems);
router.get("/:id", itemController.getItemById);
router.post("/", itemController.createItem);
router.patch("/:id", itemController.updateItem);
router.delete("/:id", itemController.deleteItem);

module.exports = router;