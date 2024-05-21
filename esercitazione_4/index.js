const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userController = require('./controllers/userController')

const app = express();

mongoose.connect('URL_STRING_DB')
const db = mongoose.connection

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static("static"))

app.post('/login', userController.login)
app.get('/verifyProtectedRoute', userController.verifyAuth, (req, res) => {
  res.send('Utente ' + req.user.firstName + ' ' + req.user.lastName + ' autorizzato ad accedere')
})

db.once("open", () => {
  console.log("DB connesso")
  app.listen(3000, () => {
    console.log('Server in ascolto');
  })
})

