require("dotenv").config();
const mongoose = require("mongoose");
const Recipe = require("./models/Recipe");
const Category = require("./models/Category");

const recipes = [
  {
    title: "Spaghetti Bolognese",
    category: "Dinner",
    ingredients: ["Spaghetti", "Ground beef", "Tomato sauce", "Onion", "Garlic"],
    steps: ["Boil pasta", "Cook beef with onion and garlic", "Add tomato sauce", "Mix with pasta"],
    cookTime: "30 minutes",
    difficulty: "Easy",
  },
  {
    title: "Sunday Pancakes",
    category: "Breakfast",
    ingredients: ["Flour", "Milk", "Eggs", "Sugar", "Baking powder"],
    steps: ["Mix dry ingredients", "Add milk and eggs", "Cook on pan until golden"],
    cookTime: "15 minutes",
    difficulty: "Easy",
  },
  {
    title: "Chocolate Cake",
    category: "Dessert",
    ingredients: ["Flour", "Cocoa powder", "Sugar", "Eggs", "Butter"],
    steps: ["Mix all ingredients", "Pour into pan", "Bake for 30 minutes"],
    cookTime: "45 minutes",
    difficulty: "Medium",
  },
  {
    title: "Greek Salad",
    category: "Lunch",
    ingredients: ["Cucumber", "Tomato", "Feta cheese", "Olives", "Olive oil"],
    steps: ["Chop vegetables", "Add feta and olives", "Drizzle with olive oil"],
    cookTime: "10 minutes",
    difficulty: "Easy",
  },
  {
    title: "Chicken Tagine",
    category: "Dinner",
    ingredients: ["Chicken thighs", "Onion", "Preserved lemon", "Olives", "Cumin", "Ginger"],
    steps: ["Brown chicken", "Add onion and spices", "Simmer with lemon and olives for 40 min"],
    cookTime: "50 minutes",
    difficulty: "Medium",
  },
  {
    title: "Lemon Tart",
    category: "Dessert",
    ingredients: ["Shortcrust pastry", "Lemons", "Eggs", "Sugar", "Butter"],
    steps: ["Blind bake pastry", "Make lemon curd filling", "Bake until set", "Chill before serving"],
    cookTime: "40 minutes",
    difficulty: "Hard",
  },
  {
    title: "Shakshuka",
    category: "Breakfast",
    ingredients: ["Eggs", "Tomatoes", "Bell pepper", "Onion", "Cumin", "Paprika"],
    steps: ["Cook onion and pepper", "Add tomatoes and spices, simmer", "Crack eggs on top and cover until set"],
    cookTime: "25 minutes",
    difficulty: "Easy",
  },
  {
    title: "Beef Tacos",
    category: "Dinner",
    ingredients: ["Ground beef", "Taco shells", "Lettuce", "Cheese", "Salsa"],
    steps: ["Cook beef with taco seasoning", "Warm taco shells", "Fill and top with lettuce, cheese, salsa"],
    cookTime: "20 minutes",
    difficulty: "Easy",
  },
  {
    title: "Mushroom Risotto",
    category: "Dinner",
    ingredients: ["Arborio rice", "Mushrooms", "Vegetable stock", "Parmesan", "White wine"],
    steps: ["Sauté mushrooms", "Toast rice, add wine", "Add stock gradually while stirring", "Stir in parmesan"],
    cookTime: "35 minutes",
    difficulty: "Medium",
  },
  {
    title: "Caesar Salad",
    category: "Lunch",
    ingredients: ["Romaine lettuce", "Croutons", "Parmesan", "Caesar dressing", "Grilled chicken"],
    steps: ["Chop lettuce", "Toss with dressing", "Top with croutons, parmesan, and chicken"],
    cookTime: "15 minutes",
    difficulty: "Easy",
  },
  {
    title: "Banana Bread",
    category: "Dessert",
    ingredients: ["Ripe bananas", "Flour", "Sugar", "Eggs", "Butter", "Baking soda"],
    steps: ["Mash bananas", "Mix wet and dry ingredients", "Pour into loaf pan and bake"],
    cookTime: "55 minutes",
    difficulty: "Easy",
  },
  {
    title: "Grilled Salmon",
    category: "Dinner",
    ingredients: ["Salmon fillets", "Lemon", "Garlic", "Olive oil", "Dill"],
    steps: ["Marinate salmon in lemon, garlic, and oil", "Grill for 4-5 minutes per side", "Garnish with dill"],
    cookTime: "20 minutes",
    difficulty: "Medium",
  },
  {
    title: "French Toast",
    category: "Breakfast",
    ingredients: ["Bread slices", "Eggs", "Milk", "Cinnamon", "Maple syrup"],
    steps: ["Whisk eggs, milk, and cinnamon", "Dip bread and fry until golden", "Serve with maple syrup"],
    cookTime: "15 minutes",
    difficulty: "Easy",
  },
  {
    title: "Vegetable Stir Fry",
    category: "Lunch",
    ingredients: ["Broccoli", "Carrots", "Bell pepper", "Soy sauce", "Garlic", "Ginger"],
    steps: ["Heat oil, add garlic and ginger", "Stir fry vegetables until crisp-tender", "Add soy sauce and toss"],
    cookTime: "15 minutes",
    difficulty: "Easy",
  },
  {
    title: "Tiramisu",
    category: "Dessert",
    ingredients: ["Ladyfingers", "Mascarpone", "Espresso", "Cocoa powder", "Eggs", "Sugar"],
    steps: ["Dip ladyfingers in espresso", "Layer with mascarpone mixture", "Dust with cocoa and chill overnight"],
    cookTime: "30 minutes (+ chilling)",
    difficulty: "Hard",
  },
  {
    title: "Margherita Pizza",
    category: "Dinner",
    ingredients: ["Pizza dough", "Tomato sauce", "Mozzarella", "Fresh basil", "Olive oil"],
    steps: ["Spread sauce on dough", "Top with mozzarella", "Bake until crust is golden", "Garnish with basil"],
    cookTime: "25 minutes",
    difficulty: "Medium",
  },
  {
    title: "Falafel Wrap",
    category: "Lunch",
    ingredients: ["Chickpeas", "Garlic", "Cumin", "Pita bread", "Tahini sauce", "Lettuce"],
    steps: ["Blend chickpeas with spices", "Form and fry falafel balls", "Wrap with lettuce and tahini"],
    cookTime: "30 minutes",
    difficulty: "Medium",
  },
  {
    title: "Overnight Oats",
    category: "Breakfast",
    ingredients: ["Rolled oats", "Milk", "Honey", "Chia seeds", "Berries"],
    steps: ["Mix oats, milk, honey, and chia seeds", "Refrigerate overnight", "Top with berries before eating"],
    cookTime: "5 minutes (+ overnight)",
    difficulty: "Easy",
  },
  {
    title: "Beef Burger",
    category: "Dinner",
    ingredients: ["Ground beef", "Burger buns", "Cheese", "Lettuce", "Tomato", "Onion"],
    steps: ["Form and season beef patties", "Grill or pan-fry until cooked", "Assemble burger with toppings"],
    cookTime: "20 minutes",
    difficulty: "Easy",
  },
  {
    title: "Apple Crumble",
    category: "Dessert",
    ingredients: ["Apples", "Flour", "Butter", "Brown sugar", "Cinnamon", "Oats"],
    steps: ["Slice apples into baking dish", "Mix flour, butter, sugar, oats for topping", "Bake until golden and bubbling"],
    cookTime: "45 minutes",
    difficulty: "Easy",
  },
];

const categories = ["Breakfast", "Lunch", "Dinner", "Dessert"];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected — seeding now...");

    await Recipe.deleteMany();
    await Category.deleteMany();
    console.log("Old recipes and categories cleared.");

    await Category.insertMany(categories.map((name) => ({ name })));
    console.log(`${categories.length} categories added.`);

    await Recipe.insertMany(recipes);
    console.log(`${recipes.length} recipes added.`);

    console.log("Seeding complete!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err.message);
    process.exit(1);
  }
};

seedDatabase();