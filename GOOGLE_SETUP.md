# Google Sheets Setup Guide

## Overview

This project uses only **Google Sheets** for logging form submissions. File upload functionality to Google Drive has been removed.

## Step-by-Step Setup

### 1. Creating Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. Remember the project ID

### 2. Enabling Google Sheets API

1. In your project, go to "APIs & Services" → "Library"
2. Find "Google Sheets API"
3. Click "Enable"

### 3. Creating Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill out the form:
   - **Service account name**: `samsung-form-service`
   - **Description**: `Service account for Samsung Form app`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### 4. Generating Service Account Key

1. In the account list, find your Service Account
2. Click on the Service Account email
3. Go to the "Keys" tab
4. Click "Add Key" → "Create new key"
5. Select "JSON" format
6. Click "Create"
7. **Important**: The JSON file will download automatically. Keep it secure!

### 5. Placing the Key File

1. Rename the downloaded file to `service-account-key.json`
2. Place it in the `backend/` folder of your project
3. **Never commit this file to version control!**

### 6. Setting up Google Sheets

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it (e.g., "Samsung Form Submissions")
4. Click the "Share" button
5. Add your Service Account email (from the JSON file)
6. Give it "Editor" permissions
7. Copy the spreadsheet ID from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
   ```

## 🔐 Environment Configuration

Update your `.env` file with the obtained values:

```env
# Google API Configuration
GOOGLE_APPLICATION_CREDENTIALS=./backend/service-account-key.json

# Google Sheets Configuration
GOOGLE_SHEETS_ID=your-sheet-id-here
```

## 🧪 Testing Integration

Run database initialization:

```bash
cd backend
npm run setup
```

## 📊 Data Structure in Google Sheets

Each form submission will be added as a new row. Data is written without headers:

**Data order in row:**
1. Submission time (timestamp)
2. Form type ("Form")
3. Name (name)
4. Email (email)
5. Phone (phone)
6. Field 1 value (field_1755855549347)
7. Field 2 value (field_1755855577188)
8. Field 3 value (field_1755855635707)
9. Field 4 value (field_1755855695107)
10. Field 5 value (field_1755855714011)
11. Field 6 value (field_1755855729485)
12. File status ("No file")

**Example row in table:**
```
22.08.2025  Form  test@test.com  22222  2222222222  RTV Euro AGD  Air Purifier AX60R5080WD/EU    true  true  No file
```

**Important**: 
- Headers are not created automatically
- Data is written directly to the table
- Number of columns adapts to form data

## ⚠️ Important Notes

- **Files are no longer uploaded** to Google Drive
- **Only form data** is saved to Google Sheets
- **Service Account** should only have access to Google Sheets
- **No need** to configure Google Drive API

## 🆘 Troubleshooting

### "Permission denied" errors
- Check that Service Account has access to the spreadsheet
- Make sure Google Sheets API is enabled
- Verify the spreadsheet ID is correct

### "File not found" errors
- These errors should no longer occur
- Check that you're using the correct spreadsheet ID

### "API quota exceeded"
- Check billing in Google Cloud Console
- Monitor API usage in Cloud Console

## 📚 Additional Resources

- [Google Sheets API Documentation](https://developers.google.com/sheets/api)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Service Account Best Practices](https://cloud.google.com/iam/docs/service-accounts)

---

**Need help?** Check the troubleshooting section or study the API documentation.
