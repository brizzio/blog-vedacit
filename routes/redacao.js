var express = require('express');
var router = express.Router();

var User = require('../models/user');


router.post('/edit/:id', function(req,res){
  console.log(req.params.id);
  var redacao = {
    titulo: req.body.titulo,
    texto : req.body.texto
  }
  var query = { _id: req.params.id}
  console.log(redacao);
  User.update(query,redacao,function(err){
    if (err) return console.log(err);
    req.flash('success_msg', 'Texto atualizado em nosso banco de dados.');
    res.redirect('/main');
  });

});

module.exports = router;
