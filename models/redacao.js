var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// esta conexao esta no app... por isso desabilitei essas linhas
//mongoose.connect('mongodb://localhost/loginapp');
//
//var db = mongoose.connection;

// User Schema
var RedacaoSchema = mongoose.Schema({

	titulo: {
		type: String
	},
	autor_id:{
		type: String
	},
	texto:{
		type: String
	}
});

var Redacao=module.exports=mongoose.model('Redacao', RedacaoSchema);

module.exports.createRedacao=function(newRedacao, callback)
{
      newRedacao.save(callback);
}

module.exports.getUserByUsername = function(username, callback)
      {
        var query = {username: username};
        User.findOne(query, callback);
      }

module.exports.getUserById = function(id, callback)
            {
              User.findById(id, callback);
            }


module.exports.comparePassword=function(candidatePassword, hash, callback)
{
          bcrypt.compare(candidatePassword, hash, function(err, isMatch)
          {
          if(err) throw err;
          callback(null,isMatch);
          });
}
