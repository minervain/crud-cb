const express = require('express');
const path = require('path');
const ejs = require('ejs');
const Blog = require('./models/Blog');
const mongoose = require('mongoose')
const app = express();
const methodOverride = require('method-override');
const fs = require("fs");
const blogController=require('./controller/blogController')
const routerController=require('./controller/blogRouter')

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
app.get('/',blogController.getBlog)

app.get("/about",routerController.getAbout)

app.get("/add_post",blogController.getAdd)

app.post('/blogs',blogController.getCreate)
app.get('/post/:id',routerController.getIdPage)
app.get('/post/edit/:id',routerController.getEditPage)


app.put('/post/:id',blogController.getPostEdit)

app.delete('/blog/:id', blogController.getDelete)


const port=5000;

app.listen(port, () => {
  console.log(`Sunucu ${port} 'da Çalışıyor`);
});
