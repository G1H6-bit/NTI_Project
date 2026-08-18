# 🍳 Tasty Share — Recipe Sharing Platform

A full-stack recipe-sharing web app where users can register, log in, publish their own recipes with photos, browse by category, and manage their content — with role-based access control for admins.

Built as part of the NTI backend development track.

---

## 📌 Project Description

Tasty Share lets home cooks and food lovers discover, create, and share recipes with a community. Chefs (registered users) can publish recipes with photos, edit or delete their own content, and browse recipes by category. Admins moderate users and content.

---

## 🛠️ Tech Stack

**Backend**
- Node.js + Express.js
- MongoDB Atlas (cloud database) + Mongoose
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing
- Multer for image uploads
- dotenv for environment variables

**Frontend**
- Angular
- HttpClient for API communication

**Other**
- MongoDB Atlas for hosting the database
- Postman for API testing

---

## 📂 Project Structure

```
NTI_Project/
├── config/
│   └── db.js                  # MongoDB connection setup
├── controllers/
│   ├── recipesController.js   # Recipe CRUD logic
│   ├── categoriesController.js
│   └── usersController.js     # Register / Login logic
├── middleware/
│   ├── auth-middleware.js     # JWT verification & role checks
│   └── multer-middleware.js   # Image upload handling
├── models/
│   ├── Recipe.js
│   ├── Category.js
│   └── User.js
├── routes/
│   ├── recipesRoutes.js
│   ├── categoriesRoutes.js
│   └── usersRoutes.js
├── utils/
│   └── delete-uploaded-file.js
├── uploads/                   # Uploaded images (not tracked in Git)
├── seed.js                    # Script to populate sample recipes
├── index.js                   # App entry point
└── .env                       # Environment variables (not tracked in Git)
```

---

## ✨ Features

**Authentication**
- ✅ Register (with hashed passwords)
- ✅ Login (returns a JWT token)
- ✅ Protected "get my profile" route

**Authorization**
- ✅ Role-based access (`chef` / `admin`)
- ✅ Only logged-in users can create, edit, or delete recipes
- ✅ Recipes are linked to the user who created them (`author`)

**CRUD**
- ✅ Recipes: create, read, update, delete
- ✅ Categories: create, read, delete

**Image Upload**
- ✅ Recipe photos uploaded via Multer
- ✅ Old images automatically cleaned up on update/delete
- ✅ Uploaded images served as static files

**Database**
- ✅ MongoDB Atlas (cloud-hosted)
- ✅ Seed script with 20 sample recipes across 4 categories

---

## 🚀 Getting Started

### 1. Clone the repo
```bash
git clone https://github.com/G1H6-bit/NTI_Project.git
cd NTI_Project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Create a `.env` file in the root folder
```
DATABASE_URL=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d
```

### 4. (Optional) Seed the database with sample recipes
```bash
node seed.js
```

### 5. Run the server
```bash
node index.js
```
The API will be running at `http://localhost:5000`.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | Auth required |
|--------|----------|--------------|----------------|
| POST | `/api/v1/users/register` | Register a new user | No |
| POST | `/api/v1/users/login` | Log in, returns a token | No |
| GET | `/api/v1/users/me` | Get current logged-in user's profile | Yes |

### Recipes
| Method | Endpoint | Description | Auth required |
|--------|----------|--------------|----------------|
| GET | `/api/v1/recipes` | Get all recipes | No |
| GET | `/api/v1/recipes/:id` | Get one recipe | No |
| POST | `/api/v1/recipes` | Create a recipe (form-data, image field: `image`) | Yes |
| PATCH | `/api/v1/recipes/:id` | Update a recipe | Yes |
| DELETE | `/api/v1/recipes/:id` | Delete a recipe | Yes |

### Categories
| Method | Endpoint | Description | Auth required |
|--------|----------|--------------|----------------|
| GET | `/api/v1/categories` | Get all categories | No |
| POST | `/api/v1/categories` | Create a category | No |
| DELETE | `/api/v1/categories/:id` | Delete a category | No |

---

## 🎨 UI Design

See [`tasty-share-ui.html`](./tasty-share-ui.html) for a full clickable mockup of all 8 app screens (Login, Register, Home, Recipes List, Recipe Details, Add/Edit Recipe, Profile, Admin Dashboard).

Live version: *[add your GitHub Pages link here if enabled]*

## 📄 Project Plan

See [`Recipe-Sharing-App-Project-Plan.pdf`](./Recipe-Sharing-App-Project-Plan.pdf) for the full breakdown of user roles, features, and page designs.

---

## 👤 Author

Built by [G1H6-bit](https://github.com/G1H6-bit) as part of the NTI training program.
