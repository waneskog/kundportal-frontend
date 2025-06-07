const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 4000;
const JWT_SECRET = 'superhemlig_nyckel';

app.use(cors());
app.use(bodyParser.json());

// Multer setup for file uploads
const upload = multer({ dest: path.join(__dirname, 'uploads/') });

// Simple user for demo
const USER = { email: 'test@kund.se', password: 'hemligt' };

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (email === USER.email && password === USER.password) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ success: true, token });
  }
  res.status(401).json({ success: false, message: 'Fel e-post eller lösenord' });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post('/api/upload', authenticateToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: 'Ingen fil uppladdad' });
  res.json({ success: true, filename: req.file.filename, originalname: req.file.originalname });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
