const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema
const BlogSchema = new Schema({
    title: String,
    description: String,
    dateCreated: {
      type: Date,
      default: Date.now,
    },
  });


  
  const Blog = mongoose.model('Blog', BlogSchema);
  
  module.exports = Blog;