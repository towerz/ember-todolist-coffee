Todos = require './app'

TodoController = require './controllers/todo'
TodosController = require './controllers/todos'

Todo = require './model/todo'

EditTodoView = require './views/edit_todo'

TodosRouter = require './router'

JST = require './jst'
$ = require 'jquery'

$el = $ JST.app()
$el.appendTo $('body')

$style = $ '<style/>'
$style.html JST.CSS.app
$style.appendTo $el

window.Todos = Todos

module.exports = Todos
