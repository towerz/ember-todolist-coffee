Ember = require 'ember'
Todos = require '../app'

Todos.TodoController = Ember.ObjectController.extend(
  isCompleted: ((key, value) ->
    model = @get 'model'
    if value == undefined
      # property being used as a getter
      model.get 'isCompleted'
    else
      # property being used as a setter
      model.set 'isCompleted', value
      model.save()
      value
  ).property 'model.isCompleted'

  actions:
    editTodo: ->
      @set 'isEditing', true
      return

    removeTodo: ->
      todo = @get 'model'
      todo.deleteRecord()
      todo.save()
      return

    acceptChanges: ->
      @set 'isEditing', false
      if Ember.isEmpty @get('model.title')
        @send 'removeTodo'
      else
        @get('model').save()
      return

  isEditing: false
)

module.exports = Todos.TodoController
