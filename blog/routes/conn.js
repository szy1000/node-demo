var mongo=require("mongodb");
var server=mongo.Server("localhost",27017,{auto_reconnect:true});
var db=new mongo.Db("test",server,{safe:true});



function selectAll(fun){  //全部查询
	db.open(function (err,db) {
		db.collection("user", function (err,collection) {
			collection.find({}).toArray(function(err,docs){
				    return true;
			});
		});
	});	
}

exports.selectAll = selectAll;
exports.select = select;
exports.insert = insert;


function select(att,fun){  //根据条件查询
	db.open(function (err,db) {
		db.collection("user", function (err,collection) {
			collection.find(att).toArray(function(err,docs){
					fun(docs);
					db.close();
			});
		});
	});	
}


function insert(data){  //增加一条数据
	db.open(function (err,db) {
		db.collection("user", function (err,collection) {
			collection.insert(data, function(err, result){
				console.log('success')
			})
		});
	});	
}

//
//
//function del(data){  //删除一条数据
//	db.open(function (err,db) {
//		db.collection("user", function (err,collection) {
//			collection.remove(data, function(err, result){
//				console.log('success')
//			})
//		});
//	});	
//}
//
//
//
//
//
//
//
