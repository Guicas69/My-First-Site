require('dotenv').config();
const express = require('express');
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

/* ── Main routes — one per HTML page ── */

/* Home page */
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
  /* Menu page */
  app.get('/menu', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/menu.html'));
  });
  
  /* Contact / Reservations page */
  app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/contact.html'));
  });
  
  /* About page */
  app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/about.html'));
  });
  
  /* Login page */
  app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/login.html'));
  });
  
  /* Register / Create account page */
  app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/create_account.html'));
  });
  
  /* ── Start the server ── */
  app.listen(PORT, () => {
    console.log(`✅ Napoli Fuoco server running at http://localhost:${PORT}`);
  });
  