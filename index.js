const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

connectDB();

const recipesRoutes = require("./routes/recipesRoutes");
app.use("/api/v1/recipes", recipesRoutes);

const categoriesRoutes = require("./routes/categoriesRoutes");
app.use("/api/v1/categories", categoriesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});