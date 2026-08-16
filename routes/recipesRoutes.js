const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipesController");
const multerUpload = require("../middleware/multer-middleware");

router.get("/", recipesController.getAllRecipes);
router.get("/:id", recipesController.getRecipe);
router.post("/", multerUpload.single("image"), recipesController.createRecipe);
router.patch("/:id", multerUpload.single("image"), recipesController.updateRecipe);
router.delete("/:id", recipesController.deleteRecipe);

module.exports = router;