const express = require('express');
const path = require('path');
const ejs = require('ejs');
const Blog = require('./models/Blog');
const mongoose = require('mongoose')
const app = express();
const methodOverride = require('method-override');
const fs = require("fs");

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
app.use(methodOverride('_method'));

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
app.get('/post/edit/:id', async (req, res) => {
  const posts = await Blog.findOne({ _id: req.params.id });
  res.render('edit', {
    posts,
  });
});
app.put('/post/:id', async (req, res) => {
  const blog = await Blog.findOne({ _id: req.params.id });
  blog.title = req.body.title
  blog.description = req.body.description
  blog.save()

  res.redirect(`/post/${req.params.id}`)
});

app.delete('/blog/:id', async (req, res) => {
  try {
    const blogId = req.params.id; // İstekten gelen parametre olan 'id'yi alıyoruz
    const deletedBlog = await Blog.findByIdAndRemove(blogId); // Blog modelinde verilen 'id'ye sahip blogu bulup silme işlemi yapıyoruz
    
    if (!deletedBlog) {
      // Eğer silinecek blog bulunamazsa, hata mesajı döndürün
      return res.status(404).send('Silinecek blog bulunamadı.');
    }
    
    // Silme işlemi başarılıysa ana sayfaya yönlendirin veya isteğin geldiği sayfaya geri dönebilirsiniz
    res.redirect('/'); // Ana sayfaya yönlendiriliyor, isteğe bağlı olarak başka bir sayfaya yönlendirebilirsiniz
  } catch (err) {
    // Hata durumunda hatayı yakalayın ve hata mesajını gönderin
    res.status(500).send('Silme işlemi sırasında bir hata oluştu.');
  }
});
app.listen(3002, () => {
  console.log('Sunucu 5000 numaralı portta çalışıyor...');
});
