const express = require("express");
const app = express();

app.use(express.json());

const recipesRoutes = require("./routes/recipesRoutes");
app.use("/api/v1/recipes", recipesRoutes);

app.listen(5000, () => {
  console.log("server running on port 5000");
});