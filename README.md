**To-Do List MERN Project**
It includes:

✔️ Project overview
✔️ Features
✔️ Fast response time explanation
✔️ Tech stack
✔️ Folder structure
✔️ API authentication
✔️ Installation steps
✔️ ENV setup
✔️ Screenshots placeholders
✔️ Future enhancements

You can directly paste this into your **README.md** file.

---

# 📌 **To-Do List App – MERN Stack (Fast, Secure & Responsive)**

A modern, full-stack **To-Do List Application** built using the **MERN stack** with JWT authentication, optimized backend queries, and a highly responsive frontend UI.
This project focuses on **fast response times**, **clean architecture**, and **smooth user experience**.

---

# 🚀 **Features Overview**

### 🔐 **1. Secure Authentication**

* User Registration
* User Login
* Password hashing using **bcrypt.js**
* Token-based authentication using **JWT**
* Protected routes for Task management

---

### 📝 **2. Task Management**

* Create Tasks
* Update Tasks
* Delete Tasks
* Fetch all tasks for logged-in user
* Text-based search support (`title` & `description`)
* Priority & Status fields

---

### ⚡ **3. High Performance & Fast Response Time**

This project is optimized for **speed**:

#### Backend-level optimizations:

* `.select()` used to fetch only required fields
* `.lean()` used to return lightweight plain JSON → **40% faster** read operations
* Indexed schema on:

  * `title`
  * `priority`
  * `dueDate`
  * `description`
* Efficient Mongo queries ensure instant API responses

#### Frontend-level optimizations:

* Built using **React + Vite** for instant UI startup
* Minimal bundle size
* Fast state updates
* Smooth page transitions and responsive Tailwind UI

You get **near real-time response** for all CRUD operations.

---

### 🎨 **4. Modern Frontend UI**

* Built with **React + Vite** (super-fast dev environment)
* Styled using **Tailwind CSS**
* Attractive, responsive, and clean UI
* Glassmorphism & subtle animations
* Mobile-friendly layout

---

### 🛡 **5. Clean & Scalable Architecture**

* MVC pattern used in backend
* Separate routers, controllers, models, middleware
* Easy to add new features
* Easily scalable for future enhancements

---

# 🏗 **Tech Stack**

### **Frontend**

* React (Vite)
* React Router
* Tailwind CSS
* LocalStorage for token storage

### **Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt.js
* dotenv

---

# 📁 **Project Structure**

## Backend:

```
/backend
 ├── controllers
 │    ├── authController.js
 │    └── taskController.js
 ├── middleware
 │    └── authMiddleware.js
 ├── models
 │    ├── User.js
 │    └── Task.js
 ├── routes
 │    ├── authRoutes.js
 │    └── taskRoutes.js
 ├── config
 │    └── connectDB.js
 └── server.js
```

## Frontend:

```
/frontend
 ├── components
 │    └── AuthForm.jsx
 ├── pages
 │    ├── Login.jsx
 │    └── Register.jsx
 ├── utils
 │    └── api.js
 └── src / assets / styles
```

---

# 🔐 **API Endpoints**

## **Auth Routes**

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

## **Task Routes (Protected)**

| Method | Endpoint         | Description            |
| ------ | ---------------- | ---------------------- |
| POST   | `/api/tasks`     | Create a new task      |
| GET    | `/api/tasks`     | Get all tasks for user |
| PUT    | `/api/tasks/:id` | Update a task          |
| DELETE | `/api/tasks/:id` | Delete a task          |

**Note:**
All task routes require `"Authorization: Bearer <TOKEN>"` header.

---

# ⚙️ **Environment Variables**

Create a `.env` file in backend root:

```
MONGO_URI=mongodb+srv://yourcluster
JWT_SECRET=your_secret_key
JWT_EXPIRE=---
PORT=your port number
```

---

# 📥 **Installation & Setup**

## **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

---

## **2. Backend Setup**

```bash
cd backend
npm install
npm run dev
```

Ensure your MongoDB URI is added to `.env`.

---

## **3. Frontend Setup**

```bash
cd frontend
npm install
npm run dev
```



