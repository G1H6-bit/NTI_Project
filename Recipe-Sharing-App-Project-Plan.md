# Project Name
**Tasty Share — Recipe Sharing Platform**

---

# 1. Project Description

Tasty Share is a recipe-sharing web application that allows home cooks and food lovers to discover, create, and share recipes with a community. Users can browse recipes by category, save favorites, and upload their own recipes with photos. Admins moderate content and manage the platform.

**Problem it solves:** Many people struggle to find reliable, well-organized recipes and have no easy way to save or share their own cooking ideas with others.

**Target users:** Home cooks, food bloggers, and anyone who wants to discover or share recipes.

**Main purpose:** To create a simple, attractive platform where users can publish recipes with photos, browse recipes by category, and save their favorites — while admins keep the content organized and appropriate.

---

# 2. Users and Roles

| Role | Permissions | Available Actions |
|------|-------------|---------------------|
| **Admin** | Full control over users and content | Manage users, manage all recipes, manage categories, delete inappropriate content |
| **Chef (Registered User)** | Manage own content | Create/edit/delete own recipes, upload recipe photos, upload profile picture, mark favorites, comment on recipes |
| **Guest (Not Logged In)** | View-only | Browse recipes, view recipe details, search/filter — cannot post, favorite, or comment |

---

# 3. Main Features

### Authentication Features
- Register (name, email, password)
- Login (email + password, returns JWT token)
- Logout
- Password hashing (bcrypt)

### Authorization Features
- Role-based access control (Admin vs Chef vs Guest)
- Protected routes — only logged-in users can create/edit/delete recipes
- Only the recipe's owner (or an Admin) can edit/delete that recipe
- Admin-only dashboard to manage users and all recipes

### CRUD Features

**Recipes**
- Create: Add a new recipe (title, category, ingredients, steps, cook time, difficulty, photo)
- Read: View all recipes / view single recipe details / filter by category
- Update: Edit recipe details (owner or admin only)
- Delete: Remove a recipe (owner or admin only)

**Categories**
- Create: Add a new category (admin only)
- Read: View all categories
- Update: Edit category name (admin only)
- Delete: Remove category (admin only)

**Users**
- Read: View own profile / admin can view all users
- Update: Edit own profile info and profile picture
- Delete: Admin can remove a user account

**Favorites**
- Create: Add a recipe to favorites
- Read: View list of favorite recipes
- Delete: Remove a recipe from favorites

---

# 4. Image/File Upload Features

| Upload | Allowed Types | Max Size | Who Can Upload |
|--------|---------------|----------|-----------------|
| Recipe Photo | JPG, PNG | 5 MB | Chef (logged-in users) |
| Profile Picture | JPG, PNG | 2 MB | Chef (logged-in users) |

---

# 5. UI Design — Pages to Design

- **Login Page** — email, password, "Register" link
- **Register Page** — name, email, password, confirm password
- **Home Page** — hero section, featured/favorite recipes, category shortcuts
- **Recipes List Page** — grid of recipe cards with photo, title, category, filter/search bar
- **Recipe Details Page** — large photo, ingredients list, step-by-step instructions, favorite button, edit/delete (if owner)
- **Add/Edit Recipe Page** — form with title, category dropdown, ingredients, steps, photo upload
- **Profile Page** — user info, profile picture, "My Recipes" list, "My Favorites" list
- **Admin Dashboard** — sidebar navigation, table of all users, table of all recipes, manage categories

*(Design these in Figma, Canva, or Adobe XD, then add your design link at the bottom of this document.)*

---

# 6. UI Screens — Component Breakdown

### Recipes List Page
- Sidebar: category filter list
- Top bar: search input + "Add Recipe" button
- Grid: recipe cards (photo, title, category badge, favorite icon)

### Recipe Details Page
- Large photo banner
- Title, category, cook time, difficulty badges
- Ingredients list (left column)
- Steps list (right column, numbered)
- Favorite button (heart icon)
- Edit / Delete buttons (only visible to owner/admin)

### Add/Edit Recipe Form
- Title input
- Category dropdown
- Ingredients (add/remove list items dynamically)
- Steps (add/remove list items dynamically)
- Cook time input
- Difficulty dropdown (Easy/Medium/Hard)
- Photo upload button with preview
- Save / Cancel buttons

### Admin Dashboard
- Sidebar: Users, Recipes, Categories tabs
- Users table: name, email, role, delete action
- Recipes table: title, author, category, delete action
- Categories table: name, edit/delete actions

---

# 7. Project Documentation Summary

**Project Name:** Tasty Share — Recipe Sharing Platform

**Project Description:** A recipe-sharing platform where users create accounts, publish recipes with photos, browse by category, and save favorites, while admins moderate content.

**User Roles:**
```
Admin:
- Manage users
- Manage all recipes
- Manage categories

Chef (registered user):
- Create/edit/delete own recipes
- Upload recipe & profile photos
- Save favorites

Guest:
- Browse and view recipes only
```

**Features List:**
```
Authentication:
✓ Register
✓ Login
✓ Password hashing

Authorization:
✓ Role-based access (Admin / Chef / Guest)
✓ Protected routes
✓ Owner-only edit/delete

CRUD:
✓ Manage recipes
✓ Manage categories
✓ Manage users (admin)
✓ Manage favorites

Upload:
✓ Recipe photos
✓ Profile pictures
```

**UI Design Link:** *(paste your Figma/Canva link here once designed)*

---

# 8. Backend Structure Plan (matches what you're already building)

```
NTI_Project/
├── controllers/
│   ├── recipesController.js
│   ├── categoriesController.js
│   ├── usersController.js
│   └── authController.js
├── routes/
│   ├── recipesRoutes.js
│   ├── categoriesRoutes.js
│   ├── usersRoutes.js
│   └── authRoutes.js
├── models/           (added later when we connect MongoDB)
├── middleware/
│   ├── auth.js       (checks JWT token, protects routes)
│   └── upload.js      (handles image uploads)
├── uploads/           (stores uploaded images)
├── data/               (JSON files for now, MongoDB later)
├── index.js
```

This keeps the exact same beginner-friendly pattern you already know (controllers + routes), just with a few more pieces added: **auth**, **middleware**, and **file uploads**.
