
/*
 * GET home page.
 */

// exports.index = function(req, res){
//   res.render('index', { title: 'Express',supplies: ['map', 'room', 'duster'] });
// };

module.exports = function(app){
	app.get('/', function(req, res){
		res.render('index', { title: '主页', supplies: ['map', 'room', 'duster']})
	});

	app.get('/register', function(req, res){
		res.render('register', { title: '注册' });
	});

	app.post('/register', function(req, res){

	});

	ap.get('/login', function(req, res){
		res.render('login', { title: '登陆' });
	});

	app.post('/login', function(req, res){

	});

	ap.get('/post', function(req, res){
		res.render('post', { title: '发表' });
	});

	app.post('/post', function(req, res){

	})

	ap.get('/logout', function(req, res){

	});

	app.get('/lost', function(req, res){
		res.send('Hello World!');
	})
}