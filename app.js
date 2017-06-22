const express = require('express');
const app = express();
const mustache = require('mustache-express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
var list = [];
var markedList = [];
app.engine ('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.listen(3000, function(){
  console.log("ok cool, listening!")
});

app.get('/', function(request, response){
  response.render("todo", {
    pageTitle: "Todo List"
  })
});

app.post('/', function(request, response){

  // Grabs the field by its name from the request
  const todoInput = request.body.todoInput;
  list.push(todoInput);
  console.log(request)

  // request.checkBody("todoInput", "nothing entered").notEmpty();

  /// somehow do something?

  // var errors = request.validationErrors();
  // var errors = "No todo entered";


  response.render("todo", {
    pageTitle: "Todo list",
    todoInput: list,
    markAsCompleted: markedList,
  })
})
app.post('/markAsCompleted', function(request, response){

  const complete = request.body.name;
  var index = list.indexOf(complete);
  markedList.push(complete);
  list.splice(index, 1);
  response.render("todo", {
    pageTitle: "Todo list",
    todoInput: list,
    markAsCompleted: markedList,
  })
})
