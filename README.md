# The Chronicle - Vintage Blog Platform

A full-stack blogging platform with Role-Based Access Control (RBAC), built with the MERN stack (MongoDB, Express, React, Node.js) and styled with a custom vintage aesthetic using Tailwind CSS v4.

## ✨ Features

- **🎨 Vintage Design**: Custom color palette and typography (Playfair Display, Lato, Courier Prime)
- **🔐 Role-Based Access Control**: Three user roles - Admin, Author, Reader
- **🔒 Secure Authentication**: JWT-based authentication with bcryptjs password hashing
- **📝 Content Management**: Full CRUD operations for blog posts
- **👥 User Management**: Admin dashboard to manage users and content
- **📱 Responsive Design**: Mobile-first approach with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **Vite 7** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM 7** - Client-side routing
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express 4** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose 8** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB** (Local installation or MongoDB Atlas account)

## 🚀 Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd BlogApp
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/blog-cms
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRE=7d
NODE_ENV=development
```

**Important**: 
- For local MongoDB, ensure MongoDB is running on your machine
- For MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string
- Change `JWT_SECRET` to a strong, unique secret in production

Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🔧 Troubleshooting

### MongoDB Connection Error
If you see `ECONNREFUSED ::1:27017` or `ECONNREFUSED 127.0.0.1:27017`:

**Option 1: Install and Start MongoDB Locally**
- Download MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community)
- Start MongoDB service:
  - Windows: `net start MongoDB` (or start via Services)
  - Mac: `brew services start mongodb-community`
  - Linux: `sudo systemctl start mongod`

**Option 2: Use MongoDB Atlas (Cloud)**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get your connection string
3. Update `MONGODB_URI` in `backend/.env` with your Atlas connection string

### Tailwind CSS PostCSS Error
If you see PostCSS plugin errors, ensure you have `@tailwindcss/postcss` installed:
```bash
cd frontend
npm install @tailwindcss/postcss
```

## 📁 Project Structure

```
BlogApp/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js  # Authentication logic
│   │   ├── postController.js  # Post CRUD operations
│   │   └── userController.js  # User management
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── rbacMiddleware.js  # Role-based access control
│   ├── models/
│   │   ├── Post.js            # Post schema
│   │   └── User.js            # User schema
│   ├── routes/
│   │   ├── authRoutes.js      # Auth endpoints
│   │   ├── postRoutes.js      # Post endpoints
│   │   └── userRoutes.js      # User endpoints
│   ├── utils/
│   │   ├── errorHandler.js    # Error handling
│   │   └── validators.js      # Input validation
│   ├── .env                   # Environment variables
│   ├── .gitignore
│   ├── package.json
│   └── server.js              # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # Axios configuration
│   │   ├── components/
│   │   │   ├── Navbar.jsx     # Navigation component
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Auth state management
│   │   ├── pages/
│   │   │   ├── AdminPosts.jsx
│   │   │   ├── CreatePost.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── EditPost.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── PostDetails.jsx
│   │   │   ├── PostList.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx            # Main app component
│   │   ├── index.css          # Tailwind directives
│   │   └── main.jsx           # Entry point
│   ├── .gitignore
│   ├── package.json
│   ├── postcss.config.js      # PostCSS configuration
│   ├── tailwind.config.js     # Tailwind configuration
│   └── vite.config.js         # Vite configuration
│
├── .gitignore
├── GUIDE.md
└── README.md
```

## 🎨 Color Palette

- **Air Force Blue** (`#5D7A8C`): Primary text and headers
- **Dusty Taupe** (`#B8A99A`): Borders and secondary text
- **Vanilla Custard** (`#F9F3E3`): Backgrounds
- **Sunlit Clay** (`#D4A574`): Accents
- **Light Bronze** (`#C9A961`): Highlights

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (Author/Admin)
- `PUT /api/posts/:id` - Update post (Owner/Admin)
- `DELETE /api/posts/:id` - Delete post (Owner/Admin)

### Users (Admin only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 👥 User Roles

- **Reader**: Can view posts
- **Author**: Can create, edit, and delete own posts
- **Admin**: Full access to all posts and user management

## 📝 Default Admin Account

After first run, you can create an admin account by registering and manually updating the role in MongoDB, or use the seed script if provided.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Known Issues

- MongoDB must be running before starting the backend
- First user registered will need manual role assignment to Admin in MongoDB

## 📧 Support

For issues and questions, please open an issue on the repository.
"# The-Chronicle-Blog-App" 
