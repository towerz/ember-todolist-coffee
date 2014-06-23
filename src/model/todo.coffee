DS = require 'ember-data'
Todos = require '../app'

Todos.Todo = DS.Model.extend(
  title: DS.attr 'string'
  isCompleted: DS.attr 'boolean'
)

module.exports = Todos.Todo
