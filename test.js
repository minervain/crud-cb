const mongoose = require('mongoose');
const Schema = mongoose.Schema;


mongoose.connect('mongodb://localhost/blogdata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const PhotoSchema = new Schema({
    title: String,
    description: String,
  })

  const Photo = mongoose.model('Photo', PhotoSchema);

  Photo.create({
    title: 'Photo Title 1',
    description: 'Photo description 1 lorem ipsum',
  });

  Photo.find({}).exec()
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.error(err);
  });