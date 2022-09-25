const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const { request } = require('http');
const { resolve } = require('path');
const Photo = require('./models/Photo.js');
const path = require('path');
const app = express();
//veritabanına baglanma
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//template engine
app.set('view engine', 'ejs'); // javascipt engine ejs engine dönüştürüyoruz

//middleware
// const mylogger = (req, res, next) => {
//   console.log('Middleware log 1');
//   next();
// };
// const mylogger2 = (req, res, next) => {
//   console.log('Middleware log 2');
//   next(); //next metodu geri cagırılmadıgı zaman işlem devam etmiyor req ve res arasında kalıyor
// };

// app.use(mylogger);
// app.use(mylogger2);
app.use(express.static('public')); //static dosyaları public klasörüne attık
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get('/', async(req, res) => {
  const photos = await Photo.find({})
  // res.sendFile(path.resolve(__dirname, 'public/index.html')); //klasör bulmak için kullandıgımız method
  res.render('index' , {
   photos
  });
});

app.get('/about', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'public/index.html')); //klasör bulmak için kullandıgımız method
  res.render('about');
});
app.get('/add', (req, res) => {
  // res.sendFile(path.resolve(__dirname, 'public/index.html')); //klasör bulmak için kullandıgımız method
  res.render('add');
});
app.post('/photos', async(req, res) => {
  await Photo.create(req.body) //express te json objesşnş almak için kullandıgımız method
  res.redirect('/'); //anasayfaya dönmesini saglar
});
const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
