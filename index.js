require('dotenv').config();
const express = require('express');

const app = express()
const path = require('path')

app.use(express.static(path.join(__dirname, '..')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname+'/landing_page.html'));
})
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname+'login.html'));
})
app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname+'contact.html'));
  })
app.get('/menu', function (req, res) {
    res.sendFile(path.join(__dirname+'menu.html'));
})
app.get('/create_account', function (req, res) {
    res.sendFile(path.join(__dirname+'create_account.html'));
})
app.get('/information', function (req, res) {
    res.sendFile(path.join(__dirname+'information.html'));
})
app.get('/save_info', function (req, res) {
    res.sendFile(path.join(__dirname+'save_info.html'));
})

app.listen(5500)