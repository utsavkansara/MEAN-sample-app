var express = require('express');
//var MongoClient = require('mongodb').MongoClient;
var mongojs = require('mongojs');
var db = mongojs.connect('mongodb://localhost:27017/contactlist', ['contactlist']);
//var database = require('./config/database');
//first argument is db, second is collction
var bodyParser = require('body-parser');


var app = express();

//static means we are telling servers to look for static files like html, javascript, css files
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());


app.get('/contactlist',function(req,res){

	db.contactlist.find(function(err,docs){
		res.json(docs);
	});
});

app.post('/contactlist',function(req,res){
	db.contactlist.insert(req.body,function(err, doc){
		res.json(doc);
	})
});

app.delete('/contactlist/:id', function(req,res){
	var id= req.params.id;
	db.contactlist.remove({_id : mongojs.ObjectId(id)},function(err, doc){
		res.json(doc);
	})

});

app.get('/contactlist/:id',function(req,res){
	var id= req.params.id;
	db.contactlist.findOne({_id : mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id',function(req,res){
	var id = req.params.id;
	db.contactlist.findAndModify({
		query : {_id : mongojs.ObjectId(id)},
		update : {$set: {name:req.body.name, email:req.body.email, number:req.body.number}},
		new : true}, function (err,doc){
			res.json(doc);
		});
});

app.listen(8000);
console.log("Server running on port 8000");