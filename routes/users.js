var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

//login
router.get('/login', function(request, response){
  response.render('login');
});


//register
router.get('/register', function(request, response){
  response.render('register');
});

//register post
router.post('/register', function(req, res){
          var name = req.body.name;
          var empresa = req.body.empresa;
          var departamento = req.body.departamento;
          var cargo = req.body.cargo;
          var email  = req.body.email;
          var password = req.body.password;
          var password2 = req.body.password2;


          // Validation
  	req.checkBody('name', 'Entre com o Nome Completo. Esta informação é obrigatória.').notEmpty();
  	req.checkBody('email', 'Entre com o seu endereço de email. Esta informação é obrigatória.').notEmpty();
    req.checkBody('departamento', 'Entre com o Setor onde você trabalha. Esta informação é obrigatória.').notEmpty();
  	req.checkBody('email', 'O endereço de email digitado não é valido.').isEmail();
  	req.checkBody('password', 'Entre com a senha. Esta informação é obrigatória.').notEmpty();
  	req.checkBody('password2', 'A senha digitada não confere com a anterior.').equals(req.body.password);



          var errors = req.validationErrors();

          if (errors)
          {
            res.render('register', {
                  errors:errors
            });
          }
          else
          {
            var newUser = new User({
                                      name: name,
                                      empresa:empresa,
                                      departamento:departamento,
                                      cargo:cargo,
                                      email:email,
                                      password: password
                                                      });
          User.createUser(newUser,function(err,user)
                    {
                        if(err) throw err;
                        console.log(user);
                    });

                      req.flash('success_msg', 'Obrigado por registrar-se. Agora você pode acessar o sistema.');

                      res.redirect('/users/login');

          }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    console.log(username);
            User.getUserByEmail(username,function(err, user){
              if(err) throw err;
              if(!user){
                  return done(null,false,{message: "Usuário não cadastrado..."})
                            }
                User.comparePassword(password, user.password, function(err, isMatch){
                  if(err) throw err;
                  if(isMatch){
                          return done(null, user);
                        }else{
                          return done(null,false,{message: "Senha Inválida"})
                        }
                                                                                                                                                    });
                                                                                                                });

                                                                    }));

                        passport.serializeUser(function(user, done)
                         {
                          done(null, user.id);
                        });

                        passport.deserializeUser(function(id, done)
                        {
                                    User.getUserById(id, function(err, user)
                                    {
                                      done(err, user);
                                    });
                        });

router.post('/login',
  passport.authenticate('local', {failureRedirect:'/users/login', failureFlash:true}),

  function(req, res) {
      console.log(req.url);
      res.redirect('/blog/');

  });

router.get('/logout', function(req, res)
{
      req.logout();
      req.flash('success_msg', 'Você está desconectado do sistema.');
      res.redirect('/');
});



module.exports = router;
