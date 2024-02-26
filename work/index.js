const express = require('express')
const app = express()
const path = require('path')

app.use(express.static(__dirname+'/public'))

app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/templates/login.html'))
})
app.get('/contact', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/templates/contact.html'))
  })
app.get('/home', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/templates/home.html'))
})
app.get('/create_account', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/templates/create_account.html'))
})
app.get('/information', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/templates/information.html'))
})
app.get('/save_info', function (req, res) {
    res.sendFile(path.join(__dirname+'/public/templates/save_info.html'))
})

app.listen(3000)