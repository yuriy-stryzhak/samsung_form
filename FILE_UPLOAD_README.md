# File Upload Functionality

## Description
File upload functionality has been implemented in forms. When submitting a form, if there is a file field and it is required, the file is uploaded to the `uploads/` folder in the project root.

## Features

### Supported File Types
- **Images**: JPG, JPEG, PNG, GIF, WebP
- **Documents**: PDF, DOC, DOCX, XLS, XLSX
- **Text**: TXT, CSV

### Limitations
- Maximum file size: 10MB
- Files are saved with unique names to avoid conflicts

## Project Structure

```
project/
├── uploads/           # Folder for uploaded files
├── backend/
│   └── server.js     # Server with file processing
└── src/
    ├── components/
    │   └── LandingForm.vue  # Form with file upload
    └── pages/
        └── Admin.vue        # Admin panel with file viewing
```

## How It Works

### 1. File Upload
- User selects a file in the form field
- File is validated for type and size
- When submitting the form, the file is uploaded to the `uploads/` folder

### 2. Database Storage
- In the `submissions` table, a link to the file is saved in the `file_link` field
- The link has the format: `http://domain/uploads/filename` (full URL)

### 3. Google Sheets Integration
- Information about file presence is added to Google Sheets
- If file is uploaded: "File uploaded"
- If file is not uploaded: "No file"
- **Important**: Each submission is recorded in a new row, starting from column A

### 4. Admin Panel Viewing
- Administrator can view all uploaded files
- File links open in a new tab
- Files are accessible via direct links
- **New**: Links in Google Sheets are now clickable and lead directly to files

## API Endpoints

### POST /api/submissions
Uploads a form with a file:
```javascript
const formData = new FormData()
formData.append('form_id', formId)
formData.append('data', JSON.stringify(data))
formData.append('file', file) // Optional

const response = await axios.post('/api/submissions', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
```

### GET /uploads/:filename
Static access to uploaded files.

## Security

- Files are saved with unique names
- File type validation on the server
- File size limitation
- The `uploads/` folder is added to `.gitignore`

## Configuration

### Creating a File Field in a Form
In the admin panel when creating a form, select the field type "file":

```json
{
  "id": "document",
  "type": "file",
  "label": "Upload Document",
  "required": true,
  "order": 1
}
```

### Environment Variables
Make sure the following are configured in the `.env` file:
- `GOOGLE_SHEETS_ID` - Google Sheets ID
- `GOOGLE_APPLICATION_CREDENTIALS` - path to Google API keys file
- `BASE_URL` - base URL of your website (e.g., `http://localhost:3000` for development)

## Monitoring

### Server Logs
The server logs all file operations:
```
📝 New submission received
📋 Form ID: 1
📋 Form data: {...}
📁 File: document.pdf
📁 File uploaded successfully: document-1234567890-123456789.pdf
✅ Data saved to Google Sheets successfully
```

### Upload Verification
- Files are saved in the `uploads/` folder
- Records with `file_link` are created in the database
- File status is displayed in Google Sheets

## Troubleshooting

### File Not Uploading
1. Check file size (maximum 10MB)
2. Ensure the file type is supported
3. Check access permissions to the `uploads/` folder

### File Not Displaying in Admin Panel
1. Check that the file physically exists in the `uploads/` folder
2. Ensure that `file_link` is properly saved in the database
3. Check that the server is running and accessible

### Google Sheets Errors
1. Check Google API settings
2. Ensure the spreadsheet exists and is accessible
3. Check access permissions to the spreadsheet
