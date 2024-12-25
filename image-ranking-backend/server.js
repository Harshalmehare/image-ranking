const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql2');

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Replace with your username
  password: 'harsh@2002', // Replace with your password
  database: 'image_gallery' // Updated database name
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err.message);
    process.exit(1);
  }
  console.log('Connected to MySQL');
});

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  }
});

// API to upload an image
app.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const imagePath = `/uploads/${req.file.filename}`;
  db.query('INSERT INTO images (image_path, votes) VALUES (?, 0)', [imagePath], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Image uploaded successfully', imageUrl: `http://localhost:${PORT}${imagePath}` });
  });
});

// API to fetch all images
app.get('/images', (req, res) => {
  db.query('SELECT * FROM images', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const updatedResults = results.map(image => ({
      ...image,
      imageUrl: `http://localhost:${PORT}${image.image_path}`
    }));
    res.status(200).json(updatedResults);
  });
});

// API to vote for an image
app.post('/vote/:id', (req, res) => {
  const { id } = req.params;
  db.query('UPDATE images SET votes = votes + 1 WHERE id = ?', [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: 'Vote added successfully' });
  });
});

// API to fetch top-ranked images
app.get('/top-images', (req, res) => {
  db.query('SELECT * FROM images ORDER BY votes DESC LIMIT 3', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    const updatedResults = results.map(image => ({
      ...image,
      imageUrl: `http://localhost:${PORT}${image.image_path}`
    }));
    res.status(200).json(updatedResults);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
