import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import multer from 'multer'
import { google } from 'googleapis'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import sqlite3 from 'sqlite3'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
})
app.use('/api/', limiter)

// File upload configuration
const storage = multer.memoryStorage()
const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
})

// Database setup
let db

async function initializeDatabase() {
  db = new sqlite3.Database(process.env.DATABASE_PATH || './database.sqlite')

  // Create tables if they don't exist
  await new Promise((resolve, reject) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  await new Promise((resolve, reject) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS forms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        fields TEXT NOT NULL,
        is_active BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  await new Promise((resolve, reject) => {
    db.exec(`
      CREATE TABLE IF NOT EXISTS submissions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        form_id INTEGER NOT NULL,
        submission TEXT NOT NULL,
        file_link TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (form_id) REFERENCES forms (id)
      )
    `, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

  // Create seed user if it doesn't exist
  const userExists = await new Promise((resolve, reject) => {
    db.get('SELECT id FROM users WHERE email = ?', [process.env.ADMIN_EMAIL || 'admin@example.com'], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
  
  if (!userExists) {
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10)
    await new Promise((resolve, reject) => {
      db.run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [
        process.env.ADMIN_EMAIL || 'admin@example.com',
        hashedPassword
      ], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    console.log('Seed user created')
  }

  console.log('Database initialized')
}

// Google API setup
const googleAuth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: [
    'https://www.googleapis.com/auth/drive',
    'https://www.googleapis.com/auth/spreadsheets'
  ]
})

const drive = google.drive({ version: 'v3', auth: googleAuth })
const sheets = google.sheets({ version: 'v4', auth: googleAuth })

// Authentication middleware
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Access token required' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key')
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT id, email FROM users WHERE id = ?', [decoded.userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    if (!user) {
      return res.status(401).json({ message: 'Invalid token' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}

// Routes

// Authentication
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    )

    res.json({
      token,
      user: { id: user.id, email: user.email }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Forms CRUD
app.get('/api/forms', async (req, res) => {
  try {
    const forms = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM forms ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
    
    res.json(forms.map(form => ({
      ...form,
      fields: JSON.parse(form.fields)
    })))
  } catch (error) {
    console.error('Error fetching forms:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/api/forms', authenticateToken, async (req, res) => {
  try {
    const { name, fields, is_active } = req.body

    if (is_active) {
      // Deactivate all other forms
      await new Promise((resolve, reject) => {
        db.run('UPDATE forms SET is_active = 0', (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    const result = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO forms (name, fields, is_active) VALUES (?, ?, ?)',
        [name, JSON.stringify(fields), is_active ? 1 : 0],
        function(err) {
          if (err) reject(err);
          else resolve({ lastID: this.lastID });
        }
      )
    });

    const newForm = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM forms WHERE id = ?', [result.lastID], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.status(201).json({
      ...newForm,
      fields: JSON.parse(newForm.fields)
    })
  } catch (error) {
    console.error('Error creating form:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.put('/api/forms/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    const { name, fields, is_active } = req.body

    if (is_active) {
      // Deactivate all other forms
      await new Promise((resolve, reject) => {
        db.run('UPDATE forms SET is_active = 0 WHERE id != ?', [id], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    await new Promise((resolve, reject) => {
      db.run(
        'UPDATE forms SET name = ?, fields = ?, is_active = ? WHERE id = ?',
        [name, JSON.stringify(fields), is_active ? 1 : 0, id],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      )
    });

    const updatedForm = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM forms WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.json({
      ...updatedForm,
      fields: JSON.parse(updatedForm.fields)
    })
  } catch (error) {
    console.error('Error updating form:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.delete('/api/forms/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM forms WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    res.json({ message: 'Form deleted successfully' })
  } catch (error) {
    console.error('Error deleting form:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.patch('/api/forms/:id/activate', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    
    // Deactivate all forms
    await new Promise((resolve, reject) => {
      db.run('UPDATE forms SET is_active = 0', (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    // Activate the specified form
    await new Promise((resolve, reject) => {
      db.run('UPDATE forms SET is_active = 1 WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    
    const activatedForm = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM forms WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    res.json({
      ...activatedForm,
      fields: JSON.parse(activatedForm.fields)
    })
  } catch (error) {
    console.error('Error activating form:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

            // Submissions
            app.get('/api/submissions', authenticateToken, async (req, res) => {
              try {
                const submissions = await new Promise((resolve, reject) => {
                  db.all('SELECT * FROM submissions ORDER BY created_at DESC', (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                  });
                });
                
                res.json(submissions.map(submission => ({
                  ...submission,
                  submission: JSON.parse(submission.submission)
                })))
              } catch (error) {
                console.error('Error fetching submissions:', error)
                res.status(500).json({ message: 'Internal server error' })
              }
            })

app.delete('/api/submissions/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM submissions WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
    res.json({ message: 'Submission deleted successfully' })
  } catch (error) {
    console.error('Error deleting submission:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

app.post('/api/submissions', upload.single('file'), async (req, res) => {
  try {
    const { form_id, data } = req.body
    const file = req.file

    let fileLink = null

    // Handle file upload to Google Drive if file exists
    if (file) {
      try {
        const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID
        if (!folderId) {
          throw new Error('Google Drive folder ID not configured')
        }

        const fileMetadata = {
          name: file.originalname,
          parents: [folderId]
        }

        const media = {
          mimeType: file.mimetype,
          body: file.buffer
        }

        const uploadedFile = await drive.files.create({
          requestBody: fileMetadata,
          media: media,
          fields: 'id'
        })

        // Make file publicly accessible
        await drive.permissions.create({
          fileId: uploadedFile.data.id,
          requestBody: {
            role: 'reader',
            type: 'anyone'
          }
        })

        // Get public link
        const fileInfo = await drive.files.get({
          fileId: uploadedFile.data.id,
          fields: 'webViewLink'
        })

        fileLink = fileInfo.data.webViewLink
      } catch (fileError) {
        console.error('File upload error:', fileError)
        // Continue without file if upload fails
      }
    }

    // Save to database
    const result = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO submissions (form_id, submission, file_link) VALUES (?, ?, ?)',
        [form_id, data, fileLink],
        function(err) {
          if (err) reject(err);
          else resolve({ lastID: this.lastID });
        }
      )
    });

    // Save to Google Sheets if configured
    try {
      const spreadsheetId = process.env.GOOGLE_SHEETS_ID
      if (spreadsheetId) {
        const submissionData = JSON.parse(data)
        const row = [
          new Date().toISOString(),
          form_id,
          ...Object.values(submissionData),
          fileLink || ''
        ]

        await sheets.spreadsheets.values.append({
          spreadsheetId,
          range: 'Sheet1!A:Z',
          valueInputOption: 'RAW',
          requestBody: {
            values: [row]
          }
        })
      }
    } catch (sheetsError) {
      console.error('Google Sheets error:', sheetsError)
      // Continue if sheets integration fails
    }

    res.status(201).json({
      id: result.lastID,
      form_id: parseInt(form_id),
      submission: JSON.parse(data),
      file_link: fileLink,
      created_at: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error creating submission:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Initialize database and start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`Health check: http://localhost:${PORT}/api/health`)
  })
}).catch(error => {
  console.error('Failed to initialize database:', error)
  process.exit(1)
})
