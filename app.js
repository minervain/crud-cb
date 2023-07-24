const express = require('express');
const path = require('path');
const ejs = require('ejs');
const Blog = require('./models/Blog');
const mongoose=require('mongoose')

const app = express();


//CONNECT DB
mongoose.connect("mongodb://127.0.0.1:27017/blogdata", {
    useNewUrlParser: true,
    useUnifiedTopology: true

})



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


  app.get("/", async (req, res) => {
    const blogs = await Blog.find({});
    res.render("index.ejs", {
      blogs: blogs,
    });
  });
  app.get('/post/:id', (req, res) => {
    const postId = req.params.id;
    const post = posts.find((post) => post._id === Number(postId));
  
    if (!post) {
      // Eğer post bulunamazsa, hata sayfasına yönlendirme yapabiliriz
      return res.render('error', { message: 'Post bulunamadı' });
    }
  
    res.render('post', { post });
  });








  app.listen(5000, () => {
    console.log('Sunucu 3000 numaralı portta çalışıyor...');
  });
