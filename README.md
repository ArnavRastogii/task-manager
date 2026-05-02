# 📋 Team Task Manager

A full-stack web application for managing team projects and tasks with user authentication, role-based access control, and real-time task management.

## ✨ Features

- 🔐 **User Authentication** - Secure login and signup with JWT tokens
- 👥 **Role-Based Access Control** - Admin, Manager, and User roles with different permissions
- 📊 **Dashboard** - Overview of all tasks and projects at a glance
- 📁 **Project Management** - Create, edit, and organize projects
- ✅ **Task Management** - Create, assign, and track tasks with status updates
- 📈 **Task Analytics** - Visual charts and task statistics
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🌓 **Dark Mode Support** - Theme context for light/dark mode
- 👤 **Admin Panel** - User management and admin controls

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **JWT** - Authentication and authorization
- **Mongoose** - MongoDB object modeling

### Frontend
- **React 18** - UI library
- **Vite** - Next-generation build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **Context API** - State management

## 📦 Installation

### Prerequisites
- Node.js (v14+)
- MongoDB
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the server:
```bash
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🚀 Usage

1. **Sign Up** - Create a new account with your email and password
2. **Log In** - Access your account with credentials
3. **Dashboard** - View all your tasks and projects
4. **Create Project** - Start a new project and invite team members
5. **Manage Tasks** - Add, edit, and update task status
6. **Admin Panel** - (Admin only) Manage users and system settings

## 📁 Project Structure

```
team-task-manager/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Custom middleware (auth, role-based)
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   ├── server.js        # Express server entry point
│   └── package.json
│
└── frontend/
    ├── public/          # Static assets
    ├── src/
    │   ├── api/         # API configuration
    │   ├── assets/      # Images and media
    │   ├── components/  # React components
    │   ├── context/     # Context API providers
    │   ├── pages/       # Page components
    │   ├── App.jsx      # Main app component
    │   ├── index.css    # Global styles
    │   └── main.jsx     # Entry point
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - User login

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user profile

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create a new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Tasks
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🔐 Environment Variables

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/team-task-manager
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000/api
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support, email support@teamtaskmanager.com or open an issue in the repository.

---

**Made with ❤️ by the Team Task Manager Team**
