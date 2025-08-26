# Samsung Form - Vue 3 Dynamic Form Builder

A modern, full-stack form builder application built with Vue 3, featuring dynamic form creation, admin panel, and Google Sheets integration.

> **📖 For detailed setup instructions, see [QUICK_START.md](./QUICK_START.md)**  
> **📁 For file upload functionality details, see [FILE_UPLOAD_README.md](./FILE_UPLOAD_README.md)**  
> **🚀 For production deployment, see [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md)**

## 🚀 Features

### Frontend (Vue 3 + Composition API)
- **Dynamic Form Rendering**: Supports multiple field types (text, email, phone, select, checkbox, file upload, textarea)
- **File Upload Support**: Secure file upload with validation and preview
- **Responsive Design**: Built with Tailwind CSS for modern, mobile-first design
- **State Management**: Pinia store for efficient state management
- **Form Builder**: Intuitive admin interface for creating and managing forms
- **Real-time Updates**: Live form preview and field reordering

### Backend (Node.js + Express)
- **RESTful API**: Clean, RESTful endpoints for all operations
- **SQLite Database**: Lightweight, file-based database for easy deployment
- **Authentication**: JWT-based authentication system
- **Form Processing**: Secure form submission handling
- **Rate Limiting**: Built-in protection against abuse

### Integrations
- **Google Sheets**: Form submissions automatically logged to spreadsheets
- **File Storage**: Secure local file storage with admin access
- **Cross-platform**: Works on Windows, macOS, and Linux

## 🔧 Available Scripts

```bash
npm run frontend     # Start only frontend (Vite dev server)
npm run backend      # Start only backend (Express server)
npm run build        # Build frontend for production
npm run preview      # Preview production build
npm run setup        # Initialize database
```

## 🛠️ Tech Stack

- **Frontend**: Vue 3, TypeScript, Tailwind CSS, Pinia, Vue Router
- **Backend**: Node.js, Express, SQLite, JWT
- **Build Tools**: Vite, PostCSS
- **Integrations**: Google Sheets API

## 📋 Prerequisites

- Node.js 18+ and npm
- Google Cloud Platform account (for Sheets integration)

## 🚀 Quick Start

**For detailed setup instructions, see [QUICK_START.md](./QUICK_START.md)**

### 1. Clone and Install

```bash
git clone <repository-url>
cd samsung-form
npm install
```

### 2. Environment Setup

Copy the example environment file and configure it:

```bash
cp env.example .env
```

Edit `.env` with your configuration:

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
GOOGLE_SHEETS_ID=your-google-sheets-id

# Base URL Configuration
BASE_URL=http://localhost:3000
```

### 3. Database Setup

Initialize the database with admin user:

```bash
npm run setup
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

### 6. Google API Setup

#### Create Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API
4. Create a Service Account
5. Download the JSON key file
6. Place it in `backend/service-account-key.json`

#### Google Sheets Setup
1. Create a new Google Sheet
2. Share it with your service account email (with Editor permissions)
3. Copy the sheet ID from the URL
4. Add to `GOOGLE_SHEETS_ID` in `.env`

### 4. Database Setup

```bash
npm run setup
```

This will:
- Create the SQLite database
- Set up all required tables
- Create the admin user
- Add a sample contact form

### 5. Start the Application

#### Development Mode
```bash
# Terminal 1: Start backend
npm run backend:dev

# Terminal 2: Start frontend
npm run dev
```

#### Production Mode
```bash
# Build frontend
npm run build

# Start backend
npm run backend
```

## 📱 Usage

### Landing Page
- Visit `http://localhost:3000`
- The active form will be displayed automatically
- Users can fill out and submit forms
- File uploads are automatically processed and stored in Google Drive

### Admin Panel
- Visit `http://localhost:3000/admin`
- Login with credentials from `.env` file
- Create, edit, and manage forms
- View all form submissions
- Activate/deactivate forms

### Form Builder
- **Field Types**: text, email, phone, select, checkbox, file, textarea
- **Field Properties**: label, required/optional, placeholder, options (for select)
- **Field Ordering**: Drag and drop to reorder fields
- **Form Activation**: Only one form can be active at a time

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login

### Forms
- `GET /api/forms` - Get all forms
- `POST /api/forms` - Create new form (requires auth)
- `PUT /api/forms/:id` - Update form (requires auth)
- `DELETE /api/forms/:id` - Delete form (requires auth)
- `PATCH /api/forms/:id/activate` - Activate form (requires auth)

### Submissions
- `GET /api/submissions` - Get all submissions (requires auth)
- `POST /api/submissions` - Submit form data

### Health Check
- `GET /api/health` - Server health status

## 📁 Project Structure

```
samsung-form/
├── src/
│   ├── components/
│   │   ├── LandingForm.vue          # Dynamic form component
│   │   └── admin/
│   │       └── FormBuilderModal.vue # Form builder interface
│   ├── pages/
│   │   ├── Index.vue                # Landing page
│   │   ├── Admin.vue                # Admin dashboard
│   │   └── NotFound.vue             # 404 page
│   ├── stores/
│   │   ├── auth.ts                  # Authentication store
│   │   └── forms.ts                 # Forms management store
│   ├── router/
│   │   └── index.ts                 # Vue Router configuration
│   ├── App.vue                      # Main app component
│   └── main.ts                      # Application entry point
├── backend/
│   ├── server.js                    # Express server
│   └── setup.js                     # Database setup script
├── public/                          # Static assets
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Vite configuration
├── tailwind.config.js               # Tailwind CSS configuration
└── .env                             # Environment variables
```

## 🎨 Customization

### Styling
- Modify `src/index.css` for global styles
- Update `tailwind.config.js` for design system tokens
- Use Tailwind utility classes for component styling

### Form Fields
- Add new field types in `FormBuilderModal.vue`
- Update field rendering in `LandingForm.vue`
- Extend the `FormField` interface in `stores/forms.ts`

### Backend
- Add new routes in `backend/server.js`
- Extend database schema in `backend/setup.js`
- Modify Google API integrations as needed

## 🔐 Security Notes

- Change default JWT_SECRET in production
- Use strong passwords for admin accounts
- Configure proper CORS settings for production
- Set up HTTPS in production environment
- Regularly update dependencies

## 🚀 Deployment

### Frontend
```bash
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend
```bash
# Set NODE_ENV=production
# Update environment variables for production
npm run backend
```

### Environment Variables for Production
- Use strong `JWT_SECRET`
- Set proper `DATABASE_PATH`
- Configure production Google API credentials
- Set appropriate `PORT`

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: Protection against API abuse
- **Input Validation**: Server-side validation of all inputs
- **File Upload Security**: File type and size restrictions
- **CORS Configuration**: Proper cross-origin resource sharing
- **Helmet**: Security headers for Express

## 🐛 Troubleshooting

### Common Issues

#### Database Connection
```bash
# Check if database file exists
ls -la database.sqlite

# Re-run setup if needed
npm run setup
```

#### Google API Errors
- Verify service account key file path
- Check API permissions and scopes
- Ensure folder/sheet sharing is correct

#### Port Conflicts
```bash
# Check if ports are in use
netstat -an | grep :3000
netstat -an | grep :5000

# Change ports in .env and vite.config.ts
```

### Logs
- Backend logs are displayed in the terminal
- Check browser console for frontend errors
- Database errors are logged to console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the troubleshooting section
- Review the API documentation
- Open an issue on GitHub

---

**Built with ❤️ using Vue 3, Node.js, and modern web technologies**
