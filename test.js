const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//connect db

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//create schema

const PhotoSchema = new Schema({
  title: String,
  description: String,
});

const Photo = mongoose.model('Photo', PhotoSchema);

//create photo

// Photo.create({
//   title: 'My Photo',
//   description: 'My Photo Description',
// });

// Photo.create({
//   title: 'My Photo2',
//   description: 'My Photo Description2',
// });
//read a photo

// Photo.find({}, (err, data) => {
//   if (err) {
//     console.log('hatalı bulma işlemi');
//   } else {
//     console.log(data);
//   }
// });

//update a photo 

//   const id ="632d663414d2e1fd3780837c";

//   Photo.findByIdAndUpdate( 
//    id,
//    {
//       title : 'photo title 11 updated',
//       description: 'photo description 11updated',
//    },
//    {
//       new:true 
//    },
//     (err, data) => {
//         console.log(data);
//       }   
//   );


//delete a photo 
// const id = "632d663414d2e1fd3780837d";

// Photo.findByIdAndDelete(id, (err, data) => {
   
//    console.log("photo is removed");
   
// })