Ember = require("ember")
Todos = require("../app")

Todos.EditTodoView = Ember.TextField.extend(
  didInsertElement: ->
    $(this).focus()
    return
)

Ember.Handlebars.helper "edit-todo", Todos.EditTodoView

module.exports = Todos.EditTodoView
