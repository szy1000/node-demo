var mongondb = require('./db');

function User(user) {
	this.name = user.name;
	this.password = user.password;
	this.email = user.email;
}

module.exports = User;

//存储用户信息
User.prototype.save = function(callback){
	//要存入数据库的用户文档
	var user = {
		name: this.name,
		password: this.password,
		email: this.email
	};
	//打开数据库
	mongondb.open(function(err, db) {
		if(err) {
			return callback(err)  //错误，返回err信息
		}
		//读取 users 集合
		db.collection('users', function (err, collection) {
			if(err){
				mongondb.close();
				return callback(err); //错误，返回err信息
			}
			//将用户数据插入user 集合
			collection.insert(user, {
				saft: true
			}, function(err, user) {
				mongondb.close();
				if(err) {
					return callback(err) //错误，返回err信息
				}
				callback(null, user[0]); //成功 err为null 返回存储后的用户文档
			})
		})
	})
};

//读取用户信息
User.get = function(name, callback) {
	mongondb.open(function (err, db) {
		if(err) {
			return callback(err);
		}
		db.collection('user', function(err, collection) {
			if(err) {
				mongondb.close();
				return callback(err);
			};
			collection.findOne({
				name: name
			},function(err, user) {
				mongondb.close();
				if(err) {
					return callback(err);
				}
				callback(null, user);
			})
		})
	})
}