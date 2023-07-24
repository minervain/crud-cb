const express = require('express');
const path = require('path');
const ejs = require('ejs');
const Blog = require('./models/Blog');
const mongoose = require('mongoose')

const app = express();

//CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/blogdata", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// TEMPEngine
app.set("view engine", "ejs");

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
  const blogs = await Blog.find({});
  res.render('index', {
    blogs
  });
});

app.get("/about", (req, res) => {
  res.render('about');
});

app.get("/add_post", (req, res) => {
  res.render('add_post');
});

app.post('/blogs', async (req, res) => {
  console.log(req.body); // Form verilerini kontrol etmek için log ekle
  await Blog.create(req.body);
  res.redirect('/');
});

app.get('/post/:id', async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Blog.findById(postId);

    if (!post) {
      // Eğer post bulunamazsa, hata sayfasına yönlendirme yapabiliriz
      return res.render('error', { message: 'Post bulunamadı' });
    }

    res.render('post', { post });
  } catch (err) {
    console.error('Error while fetching post:', err);
    res.render('error', { message: 'Bir hata oluştu' });
  }
});

app.listen(3005, () => {
  console.log('Sunucu 5000 numaralı portta çalışıyor...');
});
