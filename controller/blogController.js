const Blog=require('../models/Blog')

exports.getBlog=  async (req, res) => {
    const blogs = await Blog.find({});
    res.render('index', {
      blogs
    });
  };

  exports.getAdd= (req, res) => {
    res.render('add_post');
  };

  exports.getCreate=async (req, res) => {
    console.log(req.body); // Form verilerini kontrol etmek için log ekle
    await Blog.create(req.body);
    res.redirect('/');
  };  

  
exports.getPostEdit=async (req, res) => {
    const blog = await Blog.findOne({ _id: req.params.id });
    blog.title = req.body.title
    blog.description = req.body.description
    blog.save()
  
    res.redirect(`/post/${req.params.id}`)
  };


  exports.getDelete=async (req, res) => {
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
    }};
