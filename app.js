const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const { request } = require('http');
const { resolve } = require('path');
const Photo = require('./models/Photo.js');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const app = express();
//veritabanına baglanma
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//template engine
app.set('view engine', 'ejs'); // javascipt engine ejs engine dönüştürüyoruz

//middleware
app.use(express.static('public')); //static dosyaları public klasörüne attık
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

// routes
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-datecreated');

  res.render('index', {
    photos,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  res.render('add');
});
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});
app.post('/photos', async (req, res) => {
   //await Photo.create(req.body); //express te json objesşnş almak için kullandıgımız method
 //  res.redirect('/'); //anasayfaya dönmesini saglar
  
  const uploadDir = 'public/uploads/';
  if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }


  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body, //databaseden verileri alması için belirtiğiğmiz yol
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
