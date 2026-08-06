const fs = require("fs");

// Load recipes from the JSON file when the server starts
let recipes = JSON.parse(fs.readFileSync("./data/recipes-data.json", "utf8"));

// Helper function: saves the current "recipes" array back to the JSON file
const saveToFile = (callback) => {
  fs.writeFile("./data/recipes-data.json", JSON.stringify(recipes, null, 2), callback);
};

// GET all recipes
exports.getAllRecipes = (req, res) => {
  res.status(200).json({
    status: "success",
    results: recipes.length,
    data: { recipes },
  });
};

// GET one recipe by id
exports.getRecipe = (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);

  if (!recipe) {
    return res.status(404).json({ status: "error", message: "Recipe not found" });
  }

  res.status(200).json({ status: "success", data: { recipe } });
};

// POST a new recipe
exports.createRecipe = (req, res) => {
  const newRecipe = {
    id: String(recipes.length + 1),
    ...req.body,
  };

  recipes.push(newRecipe);

  saveToFile((err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Error saving file" });
    }
    res.status(201).json({ status: "success", data: { recipe: newRecipe } });
  });
};

// PATCH (update) a recipe — e.g. toggle favorite, change title, etc.
exports.updateRecipe = (req, res) => {
  const recipe = recipes.find((r) => r.id === req.params.id);

  if (!recipe) {
    return res.status(404).json({ status: "error", message: "Recipe not found" });
  }

  // Update only the fields sent in the request body
  Object.assign(recipe, req.body);

  saveToFile((err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Error saving file" });
    }
    res.status(200).json({ status: "success", data: { recipe } });
  });
};

// DELETE a recipe
exports.deleteRecipe = (req, res) => {
  const index = recipes.findIndex((r) => r.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ status: "error", message: "Recipe not found" });
  }

  recipes.splice(index, 1);

  saveToFile((err) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Error saving file" });
    }
    res.status(200).json({ status: "success", message: "Recipe deleted" });
  });
};