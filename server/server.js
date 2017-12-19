const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const app = express();
const {Todo} = require('./model/todo');
const _ = require('lodash');
const moment = require('moment');

const PORT = process.env.PORT || 8000;
var publicPath = path.join(__dirname, '../public');
var mongoose = require('mongoose');
// console.log(publicPath);

app.use(express.static(publicPath));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/Todo', () => {
  console.log("mongoose connected to Todo Database");
});

app.get('/todos', function(req, res){
  Todo.find({}, function(err, docs){
    if(err) {
       res.status(400).send();
    }
    // console.log(docs);
     res.status(200).send(docs);
  });
});

 app.post('/search', function(req, res){
   // console.log("inside /search "+JSON.stringify(req.body));
   var obj = {};
   if(req.body.hasOwnProperty('desc')) {
    obj["desc"] = req.body.desc;
   }
   // console.log(obj);
  if(req.body.hasOwnProperty('category')) {
    obj["category"] = req.body.category;
  }
  // console.log(obj);
  if(req.body.hasOwnProperty('year')) {
      obj["year"] =  req.body.year;
      obj["month"] = req.body.month - 1;
      obj["day"] =  req.body.day;
  }
  // console.log(obj);
  Todo.find(obj, function(err, docs) {
      if(err) {
        res.status(400).send();
      }
      res.status(200).send(docs);
      res.end();
  });
});

app.post('/createTodo', function(req, res){
  // console.log("createTodo = "+JSON.stringify(req.body));
  // var body = _.pick(req.body, {'desc', 'category', 'title', ''})
  var desc = req.body.desc;
  var title = req.body.title;
  var category = req.body.category;
  var year = req.body.year;
  var month = req.body.month-1;
  var day =  req.body.day;

  console.log(desc, title, category, year, month, day);
   var newTodo = new Todo({
     desc: desc,
     title: title,
     category: category,
     year: year,
     month: month,
     day: day
   });
   newTodo.save().then((doc) => {
     // console.log(doc);
     Todo.find({}, function(err, docs){
       if(err) {
          res.status(400).send();
       }
       // console.log(docs);
        res.status(200).send(docs);
     });
   }, (err) => {
     console.log('error while writing data into db');
     res.status(400).send();
   });
});


// app.get('/', function(req, res){
//   res.sendFile(publicPath + '/index.html');
// });

app.listen(PORT, function(){
  console.log(`server up on ${PORT}`);
});
