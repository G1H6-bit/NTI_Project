const Recipe = require("../models/Recipe");
const deleteUploadedFile = require("../utils/delete-uploaded-file");

// GET all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({
      status: "success",
      results: recipes.length,
      data: { recipes },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// GET one recipe
exports.getRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ status: "error", message: "Recipe not found" });
    }

    res.status(200).json({ status: "success", data: { recipe } });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// POST new recipe (with optional image upload)
exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      image: req.file?.filename,
    });

    res.status(201).json({ status: "success", data: { recipe: newRecipe } });
  } catch (err) {
    // If the recipe failed to save, remove the image we just uploaded
    // so we don't leave an orphan file sitting in /uploads
    if (req.file) {
      deleteUploadedFile("recipes", req.file.filename);
    }
    res.status(400).json({ status: "error", message: err.message });
  }
};

// PATCH update recipe (with optional new image)
exports.updateRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {
      if (req.file) deleteUploadedFile("recipes", req.file.filename);
      return res.status(404).json({ status: "error", message: "Recipe not found" });
    }

    // If a new image was uploaded, delete the old one and use the new filename
    if (req.file) {
      if (recipe.image && recipe.image !== "default-recipe.jpg") {
        deleteUploadedFile("recipes", recipe.image);
      }
      req.body.image = req.file.filename;
    }

    Object.assign(recipe, req.body);
    const updatedRecipe = await recipe.save();

    res.status(200).json({ status: "success", data: { recipe: updatedRecipe } });
  } catch (err) {
    if (req.file) {
      deleteUploadedFile("recipes", req.file.filename);
    }
    res.status(400).json({ status: "error", message: err.message });
  }
};

// DELETE recipe (also deletes its image)
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    if (!recipe) {
      return res.status(404).json({ status: "error", message: "Recipe not found" });
    }

    if (recipe.image && recipe.image !== "default-recipe.jpg") {
      deleteUploadedFile("recipes", recipe.image);
    }

    res.status(200).json({ status: "success", message: "Recipe deleted" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};