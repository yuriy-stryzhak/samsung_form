# Production Setup

## Environment Variables for Production

### Required Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Base URL Configuration - IMPORTANT for production!
BASE_URL=https://yourdomain.com

# JWT Configuration - Must change in production!
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Database Configuration
DATABASE_PATH=/path/to/your/database.sqlite

# Admin User
ADMIN_EMAIL=your-admin-email@yourdomain.com
ADMIN_PASSWORD=your-very-secure-password

# Google API Configuration
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
GOOGLE_SHEETS_ID=your-google-sheets-id
```

## Key Points for Production

### 1. BASE_URL
**IMPORTANT**: Set the correct domain for your website:
```env
# For production
BASE_URL=https://yourdomain.com

# DO NOT use localhost in production!
# BASE_URL=http://localhost:3000  # ❌ INCORRECT
```

### 2. Security
- Change `JWT_SECRET` to a unique, complex key
- Use HTTPS in production
- Configure proper CORS settings
- Restrict access to `uploads/` folder only through API

### 3. Files
- The `uploads/` folder must be writable by the web server
- Set proper access permissions
- Consider using CDN for static files

### 4. Database
- Use absolute path to the database
- Ensure the web server has write permissions
- Make regular backups

## Setup Examples for Different Hostings

### Heroku
```env
BASE_URL=https://your-app-name.herokuapp.com
PORT=$PORT
```

### Vercel
```env
BASE_URL=https://your-app-name.vercel.app
```

### DigitalOcean App Platform
```env
BASE_URL=https://your-app-name.ondigitalocean.app
```

### AWS EC2
```env
BASE_URL=https://yourdomain.com
# or
BASE_URL=http://your-ip-address
```

## Setup Verification

After setup, verify:

1. **Files upload**: Submit a form with a file
2. **URL in database**: Check that `file_link` contains the full domain
3. **Google spreadsheet**: Ensure links are clickable
4. **File access**: Open the file link in a new tab

## Debug Logs

The server logs file URL creation:
```
📁 File uploaded successfully: document-1234567890-123456789.pdf
🔗 File link created: https://yourdomain.com/uploads/document-1234567890-123456789.pdf
```

## Troubleshooting

### Files don't open
1. Check `BASE_URL` in `.env`
2. Ensure the `uploads/` folder is accessible
3. Check web server access permissions

### Incorrect URLs in Google spreadsheet
1. Restart the server after changing `BASE_URL`
2. Check server logs
3. Ensure the environment variable loads correctly

### CORS errors
1. Configure proper CORS settings for your domain
2. Ensure frontend and backend use the same domain
