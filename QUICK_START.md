# Quick Start Guide

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Setup

Copy `.env.example` to `.env` and fill in the required fields:

```bash
cp env.example .env
```

### 3. Google Sheets Setup

1. **Create a Google Sheet** in Google Sheets
2. **Add Service Account** with "Editor" permissions
3. **Copy the table ID** from the URL

#### Setup Verification:

```bash
cd backend
npm run setup
```

**Note**: Data is written to Google Sheets directly without headers, in the same order as in the admin panel.

### 4. Launch Application

```bash
# Backend
cd backend
npm run backend

# Frontend (in new terminal)
npm run frontend
```

### 5. Testing

Open http://localhost:3000 and test the form.

## 🔧 Troubleshooting

### Setup Verification

```bash
# Database initialization
npm run setup

# Google Sheets setup
npm run setup:sheets
```

## 📚 Additional Information

- [README.md](./README.md) - Complete project description