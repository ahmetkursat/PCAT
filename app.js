const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const methodOverride = require('method-override')
const { request } = require('http');
const { resolve } = require('path');
const Photo = require('./models/Photo.js');
const path = require('path');
const fs = require('fs');
const fileUpload = require('express-fileupload');
const photoControllers = require('./controller/photoControllers');
const pagecontrollers = require('./controller/pageController');
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
app.use(methodOverride('_method',{
  methods: ['POST','GET']
}))

// routes
app.get('/', photoControllers.getALLPhotos);
app.get('/photos/:id',photoControllers.getPhoto);
app.post('/photos',photoControllers.createPhoto);
app.put('/photos/:id',photoControllers.updatePhoto);
app.delete('/photos/:id',photoControllers.deletePhoto);

app.get('/about',pagecontrollers.getAboutPage);
app.get('/add',pagecontrollers.getAddPage);
app.get('/photos/edit/:id',pagecontrollers.getEditPage);

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
