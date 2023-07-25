const Blog=require('../models/Blog')


exports.getAbout=(req, res) => {
    res.render('about');
  };

  exports.getIdPage= async (req, res) => {
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
  };

  exports.getEditPage=async (req, res) => {
    const posts = await Blog.findOne({ _id: req.params.id });
    res.render('edit', {
      posts,
    });
  };