# Samsung Form - Quick Start Guide

A dynamic form builder application with Vue 3 frontend and Express.js backend, featuring Google integrations.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Cloud Platform account (for Google Drive & Sheets integration)

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy the environment template and configure your settings:
```bash
cp env.example .env
```

Edit `.env` file with your configuration:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DATABASE_PATH=../database.sqlite

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin User (will be created automatically)
ADMIN_EMAIL=your-admin-email@example.com
ADMIN_PASSWORD=your-secure-password

# Google API Configuration
GOOGLE_APPLICATION_CREDENTIALS=./backend/service-account-key.json
GOOGLE_DRIVE_FOLDER_ID=your-google-drive-folder-id
GOOGLE_SHEETS_ID=your-google-sheets-id
```

### 3. Database Setup
Initialize the database with admin user:
```bash
node backend/setup.js
```

### 4. Start Development Servers

**Option A: Run both frontend and backend (recommended for development)**
```bash
npm run dev
```

**Option B: Run separately**
```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend  
npm run frontend
```

### 5. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Admin Panel**: http://localhost:3000/admin

## 📁 Project Structure

```
samsung_form/
├── backend/                 # Express.js server
│   ├── server.js           # Main server file
│   ├── setup.js            # Database initialization
│   └── uploads/            # File upload directory
├── src/                    # Vue 3 frontend
│   ├── components/         # Vue components
│   ├── pages/             # Page components
│   ├── stores/             # Pinia stores
│   └── router/             # Vue Router configuration
├── public/                 # Static assets
├── database.sqlite         # SQLite database
└── package.json            # Project dependencies
```

## 🔧 Available Scripts

```bash
npm run dev          # Start both frontend and backend
npm run frontend     # Start only frontend (Vite dev server)
npm run backend      # Start only backend (Express server)
npm run build        # Build frontend for production
npm run preview      # Preview production build
npm run setup        # Initialize database
```

## 🌐 Features

- **Dynamic Form Builder**: Create custom forms with various field types
- **Admin Panel**: Manage forms and view submissions
- **Google Integration**: 
  - Google Drive for file uploads
  - Google Sheets for submission logging
- **Responsive Design**: Mobile-first UI with Tailwind CSS
- **Real-time Updates**: Live form management and submission tracking

## 🔐 Security Notes

- Change default JWT_SECRET in production
- Use strong passwords for admin accounts
- Configure proper CORS settings for production
- Set up HTTPS in production environment
- Regularly update dependencies

## 🚀 Production Deployment

1. Set `NODE_ENV=production` in environment
2. Configure production database path
3. Set up reverse proxy (nginx/Apache)
4. Configure SSL certificates
5. Set up proper logging and monitoring
6. Configure backup strategy for database

## 📚 Additional Documentation

- See `README.md` for detailed project information
- Check `PROJECT_GUIDELINES.md` for design system details
- Review `backend/server.js` for API endpoints

## 🆘 Troubleshooting

**Database connection issues:**
- Ensure database path is correct in `.env`
- Check file permissions for database directory
- Run `node backend/setup.js` to reinitialize

**Google API errors:**
- Verify service account key file exists
- Check Google Cloud Console permissions
- Ensure API services are enabled

**Port conflicts:**
- Change PORT in `.env` file
- Check if ports 3000/5000 are available

## 🤝 Support

For issues and questions:
1. Check existing documentation
2. Review error logs in console
3. Verify environment configuration
4. Ensure all dependencies are installed

---

**Happy coding! 🎉**
