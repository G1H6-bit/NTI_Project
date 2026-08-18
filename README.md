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
- ✅ Signup (with hashed passwords)
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

## 🔐 Authentication Module

### What this module does
Handles user registration and login for Tasty Share. Passwords are never stored in plain text — they're hashed with **bcryptjs** before saving to MongoDB. On successful signup or login, the server returns a **JWT token**, which the client must send on future requests (as a `Bearer` token) to access protected routes like creating, editing, or deleting recipes.

### Chosen user roles
| Role | Description |
|------|--------------|
| **chef** | Default role for any registered user. Can create, edit, and delete their own recipes. |
| **admin** | Elevated role. Can manage all recipes, users, and categories (used for moderation). |

### User model fields
| Field | Type | Notes |
|-------|------|-------|
| `name` | String | Required |
| `email` | String | Required, unique, lowercase |
| `password` | String | Required, min 8 characters, hashed with bcrypt, hidden from API responses by default |
| `role` | String | `"chef"` (default) or `"admin"` |
| `profileImage` | String | Filename of uploaded profile picture (defaults to `default.jpg`) |
| `favorites` | Array of Recipe IDs | Recipes the user has marked as favorite |
| `createdAt` | Date | Auto-set when the user registers |

### Auth Routes

| Method | Endpoint | Description | Auth required |
|--------|----------|--------------|----------------|
| POST | `/api/v1/users/signup` | Register a new user, returns a JWT token | No |
| POST | `/api/v1/users/login` | Log in with email + password, returns a JWT token | No |
| GET | `/api/v1/users/me` | Get the logged-in user's own profile | Yes (Bearer token) |

**Example — Signup request body:**
```json
{
  "name": "Ahmed Samir",
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Example — Signup response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "66b1f2c3a4e5f6b7c8d9e0f1",
      "name": "Ahmed Samir",
      "email": "ahmed@example.com",
      "role": "chef"
    }
  }
}
```

**Example — Login request body:**
```json
{
  "email": "ahmed@example.com",
  "password": "password123"
}
```

**Example — Accessing a protected route:**
In Postman, go to the **Authorization** tab → Type: **Bearer Token** → paste the token from signup/login → send the request.
```
GET /api/v1/users/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### How authorization is enforced
The `protectRoute` middleware (in `middleware/auth-middleware.js`) checks for a valid token on protected routes. If missing or invalid, it returns `401 Unauthorized`. Recipe creation automatically attaches the logged-in user's ID as the recipe's `author`.

---

## 📡 Full API Endpoints

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
