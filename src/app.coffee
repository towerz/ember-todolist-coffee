Ember = require 'ember'
DS = require 'ember-data'
LSAdapter = require 'ember-localstorage-adapter'

Todos = Ember.Application.create()

Todos.TodoAdapter = DS.LSAdapter.extend {
  namespace: 'todos-emberjs'
}

Todos.ApplicationStore = DS.Store.extend {
  revision: 12
  adapter: Todos.TodoAdapter.create()
}

module.exports = Todos
