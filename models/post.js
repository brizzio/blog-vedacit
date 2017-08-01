var mongoose = require('mongoose');
// esta conexao esta no app... por isso desabilitei essas linhas
//mongoose.connect('mongodb://localhost/loginapp');
//
//var db = mongoose.connection;
/*
image object
{
"post_id:"identificador do post"
"fileName":"nome do arquivo da imagem"
"titulo":"titulo da imagem"
"path":"caminho da imagem na pasta publica"
}
*/

var ImagemSchema = mongoose.Schema({
	fileName: {
		type: String,
	},
	legenda: {
		type: String,
	},
));

// Post Schema
var PostSchema = mongoose.Schema({
	dataCriacao: {
		type: Date,
		required:true
	},
	titulo: {
		type: String,
		required:true
	},
	autor_id:{
		type: String
	},
	texto:{
		type: String,
		required:true
	},
	imagens:[ImagemSchema]
});

var Post=module.exports=mongoose.model('Post', PostSchema);

module.exports.createPost=function(newPost, callback)
{
      newPost.save(callback);
}


module.exports.getPostByAuthorId = function(autor_id, callback)
            {
              Post.findById(autor_id, callback);
            }
