var express = require('express');
var router = express.Router();

var relacionados=[
  {
    titulo:'Treinamento em Sistemas de Impermeabilização',
    texto:'A apresentação do tema consiste em descriminar a impermeabilização com foco em capacitar o profissional a escolher o sistema correto de impermeabilização. Expõe o conhecimento técnico aos participantes com foco no conteúdo teórico e exercícios de',
    refer:'/main/post1'
  },
  {
    titulo:'Conheça os vencedores do Concurso Cultural Vedasport',
    texto:'É com muita satisfação que anunciamos os 50 ganhadores do Concurso Cultural Vedasporte. Recebemos dezenas de histórias com experiências de vida, fatos engraçados, casos de família, amor ao time ou ao esporte do coração',
    refer:'/main/post4'
  },
  {
    titulo:'Workshop Soluções VEDACIT',
    texto:'O Workshop consiste em reunir profissionais que trabalham com venda de produtos ou serviços na construção e pessoas interessadas em conservar e reformar os seus imóveis. Tem como propósito promover a discussão sobre as desvantagens de um imóvel mal conservado e apresentar soluções para reformar, revitalizar e proteger ambientes e estruturas para segurança e conforto do usuário.',
    refer:'/main/post3'
  }
]



//get post 1
router.get('/post1', ensureAuthenticated, function(request, response){
  response.render('posts/post1', {layout: 'postbase', relacionados:relacionados});
});

//get post 2
//router.get('/post2', ensureAuthenticated, function(request, response){
//  response.render('posts/post2', {layout: 'postbase', relacionados:relacionados});
//});

//get post 3
router.get('/post3', ensureAuthenticated, function(request, response){
  response.render('posts/post3', {layout: 'postbase', relacionados:relacionados});
});

//get post 4
router.get('/post4', ensureAuthenticated, function(request, response){
     response.render('posts/post4', {layout: 'postbase', relacionados:relacionados});
});

//get post 4
router.get('/post5', ensureAuthenticated, function(request, response){
     response.render('posts/post5', {layout: 'postbase', relacionados:relacionados});
});


function ensureAuthenticated(req, res, next)
{
  if (req.isAuthenticated())
      {
                return next();
      }else{
                console.log('rota chamada==> ' + req.url);
                req.flash('error_msg', 'Faça o Login primeiro!');
                res.redirect('/users/login');
      }
}



module.exports = router;
