
const Photo = require('../models/Photo');
const fs = require('fs');


exports.getALLPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort('-datecreated');

  res.render('index', {
    photos,
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id); //urlde yazılan sayısal değeri işler params
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = async (req, res) => {
  //await Photo.create(req.body); //express te json objesşnş almak için kullandıgımız method
  //  res.redirect('/'); //anasayfaya dönmesini saglar

  const uploadDir = 'public/uploads/';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadeImage = req.files.image;
  let uploadPath = __dirname + '/../public/uploads/' + uploadeImage.name;

  uploadeImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body, //databaseden verileri alması için belirtiğiğmiz yol
      image: '/uploads/' + uploadeImage.name,
    });
    res.redirect('/');
  });
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id });
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();
  res.redirect(`${req.params.id}`);
};


exports.deletePhoto =  async(req, res) => {

    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedimage = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedimage);
    await Photo.findByIdAndRemove(req.params.id);

    res.redirect('/')
}
