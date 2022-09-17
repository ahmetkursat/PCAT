const express = require('express');
const { request } = require('http');
const { resolve } = require('path');

const path = require('path');

const app = express();

//middleware 
const mylogger = (req,res,next) => {
  console.log("Middleware log 1");
  next();
}
const mylogger2 = (req,res,next) => {
  console.log("Middleware log 2");
  next();  //next metodu geri cagırılmadıgı zaman işlem devam etmiyor req ve res arasında kalıyor 
}

app.use(mylogger);
app.use(mylogger2);
app.use(express.static('public'));  //static dosyaları public klasörüne attık

// app.get('/', (req, res) => {

//   const photo = {
//     id:1,
//     name:"Photoname",
//     description :"photo description"
//   }

//   res.send(photo);  //res metodu geri cagırlmadıgında get request tamamlanmıyor sadece req alınıyor res dönmüyor
// });

app.get('/',(req,res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
  
})


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
