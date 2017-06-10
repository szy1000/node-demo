
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express',supplies: ['map', 'room', 'duster'] });
// };
var crypto = require('crypto');
User = require('../models/user.js');

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index', { title: '主页', supplies: ['map', 'room', 'duster']})
	});

	app.get('/register', function(req, res){
		res.render('register', { title: '注册' });
	});

	app.post('/register', function(req, res){
		var name = req.body.name,
		password = req.body.password,
		password_re = req.body['password-repeat'];
		//检验2次输入的密码
		if(password != password_re) {
			req.flash('err', '2次输入的密码不一样');
			return res.redirect('/register'); //返回注册页
		}
		//生成md5
		var md5 = crypto.createHash('md5'),
				password = md5.update(req.body.password).digest('hex');
		var newUser = new User({
			name: req.body.name,
			password: password,
			email: req.body.email
		})
		//检查用户是否存在
		User.get(newUser.name, function(err, user) {
			if(user) {
				req.flash('error', '用户已经存在');
				return res.redirect('/register'); //返回注册页面
			}
			newUser.save(function(err, user) {
				if(err) {
					req.flash('error', err);
					return res.redirect('/register'); //注册失败
				}
				req.session.user = user;
				req.flash('success', '注册成功！');
				res.redirect('/'); //注册成功 返回主页
			})
		})

	});

	app.get('/login', function(req, res){
		res.render('login', { title: '登陆' });
	});

	app.post('/login', function(req, res){

	});

	app.get('/post', function(req, res){
		res.render('post', { title: '发表' });
	});

	app.post('/post', function(req, res){

	})

	app.get('/logout', function(req, res){

	});

	app.get('/lost', function(req, res){
		res.send('Hello World!');
	})
}