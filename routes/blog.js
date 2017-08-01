var express = require('express');
var router = express.Router();


//get Inicio dos Posts
router.get('/', ensureAuthenticated, function(request, response){
  response.render('blog', {layout: 'capa'});
});


//get detalhe do post
router.get('/postDetail', ensureAuthenticated, function(request, response){
  response.render('postDetails', {layout: 'post'});
});




//get Inicio dos Posts
router.get('/post', ensureAuthenticated, function(request, response){
  response.render('formPost', {layout: 'base'});
});


//edita o POST
router.post('/post/edit', function(req, res){
var titulo = req.body.titulo;
var author_id  = req.params.user.id;
var texto = req.body.texto;


// Validation
req.checkBody('titulo', 'Name is required').notEmpty();
req.checkBody('texto', 'O post nao pode ser nulo!').notEmpty();

var errors = req.validationErrors();

if (errors)
{
  res.render('formPost', {
        errors:errors
  });
}
else
{
  var newPost = new post({
                            titulo: titulo,
                            author_id:author_id,
                            texto:texto,
                                            });
Post.createPost(newPost,function(err,post)
          {
              if(err) throw err;
              console.log(post);
          });

            req.flash('success_msg', 'Post adicionado com sucesso!');

            res.redirect('/blog');

}
});



function ensureAuthenticated(req, res, next)
{
  if (req.isAuthenticated())
      {
                return next();
      }else{
                req.flash('error_msg', 'Faça o Login primeiro!');
                res.redirect('/users/login');
      }
}



module.exports = router;
