import sqlite3 from 'sqlite3'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

async function setupDatabase() {
  console.log('Setting up database...')
  
  let db
  
  try {
    // Open database
    db = new sqlite3.Database(process.env.DATABASE_PATH || '../database.sqlite')

    // Create tables
    console.log('Creating tables...')
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

    // Create admin user
    console.log('Creating admin user...')
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@samsung.com'
    const adminPassword = process.env.ADMIN_PASSWORD || 'm8<\\.XZSHnv;hL?'
    
    const userExists = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM users WHERE email = ?', [adminEmail], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!userExists) {
      const hashedPassword = await bcrypt.hash(adminPassword, 10)
      await new Promise((resolve, reject) => {
        db.run('INSERT INTO users (email, password_hash) VALUES (?, ?)', [
          adminEmail,
          hashedPassword
        ], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
      console.log(`Admin user created: ${adminEmail} / ${adminPassword}`)
    } else {
      console.log('Admin user already exists')
    }

    // Create sample form
    console.log('Creating sample form...')
    const sampleForm = {
      name: 'Contact Form',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          required: true,
          placeholder: 'Enter your full name',
          order: 0
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          required: true,
          placeholder: 'Enter your email address',
          order: 1
        },
        {
          id: 'phone',
          type: 'phone',
          label: 'Phone Number',
          required: false,
          placeholder: 'Enter your phone number',
          order: 2
        },
        {
          id: 'subject',
          type: 'select',
          label: 'Subject',
          required: true,
          options: ['General Inquiry', 'Support Request', 'Business Proposal', 'Other'],
          order: 3
        },
        {
          id: 'message',
          type: 'textarea',
          label: 'Message',
          required: true,
          placeholder: 'Enter your message',
          order: 4
        },
        {
          id: 'agreement',
          type: 'checkbox',
          label: 'I agree to the terms and conditions',
          required: true,
          order: 5
        }
      ],
      is_active: true
    }

    const formExists = await new Promise((resolve, reject) => {
      db.get('SELECT id FROM forms WHERE name = ?', [sampleForm.name], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
    
    if (!formExists) {
      await new Promise((resolve, reject) => {
        db.run(
          'INSERT INTO forms (name, fields, is_active) VALUES (?, ?, ?)',
          [sampleForm.name, JSON.stringify(sampleForm.fields), sampleForm.is_active ? 1 : 0],
          (err) => {
            if (err) reject(err);
            else resolve();
          }
        );
      });
      console.log('Sample form created')
    } else {
      console.log('Sample form already exists')
    }

    console.log('Database setup completed successfully!')
    console.log(`Admin user created: ${adminEmail}`)
    console.log('\nYou can now start the server with: npm run backend')

  } catch (error) {
    console.error('Database setup failed:', error)
    process.exit(1)
  } finally {
    // Close database connection
    if (db) {
      db.close((err) => {
        if (err) {
          console.error('Error closing database:', err);
        } else {
          console.log('Database connection closed');
        }
      });
    }
  }
}

setupDatabase()
