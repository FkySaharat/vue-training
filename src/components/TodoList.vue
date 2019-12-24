<template>
  <div> 
    <section class="todoapp">
      <header class="header">
        <br/><h1><font color="#f5f5f5;"> Todo List .. </font></h1>
        <TodoInput v-on:addTodo="addFromInput"></TodoInput> 
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <CheckALl v-on:addChack="addFromInput"></CheckALl> 
        <h5>
          <font color="#fffff;"> Check All </font>
          <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
        </h5>
          <label for="toggle-all"></label>
          <ul class="todo-list">
            <li v-for="todo in filteredTodos" class="todo" :key="todo.id"
            :class="{ completed: todo.completed, editing: todo == editedTodo }">
              <div class="view" v-show="todo.id!=editedTodo.id" @dblclick="editTodo(todo)">
                <input class="toggle" type="checkbox" v-model="todo.completed ">
                <label >{{ todo.title }}</label>
                <button class="destroy" @click="removeTodo(todo)"></button>
              </div>
              <input v-show="todo.id===editedTodo.id" class="edit" type="text" 
                v-model="todo.title" v-todo-focus="todo == editedTodo"
                @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)" @keyup.esc="cancelEdit(todo)">
            </li>
          </ul>
      </section>
      <footer class="footer" v-show="todos.length" v-cloak>
        <span class="todo-count">
          <strong>{{ remaining }}</strong> {{ remaining | pluralize }} left
        </span>
        <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
          Clear completed
        </button>
      </footer>
    </section>
  </div>
</template>

<script>

import TodoInput from './TodoInput.vue'
var STORAGE_KEY = 'todos-vuejs-2.0'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}


var filters = {
  all: function (todos) {
    return todos
  },
  active: function (todos) {
    return todos.filter(function (todo) {
      return !todo.completed
    })
  },
  completed: function (todos) {
    return todos.filter(function (todo) {
      return todo.completed
    })
  }
}

export default {

  components: {TodoInput},

  data() {
    return {
      todos: todoStorage.fetch(),
      newTodo: '',
      editedTodo: {},
      visibility: 'all'
    }
  },

  watch: {
    todos: {
      handler: function (todos) {
        todoStorage.save(todos)
      },
      deep: true
    }
  },

  computed: {
    filteredTodos: function () {
      return filters[this.visibility](this.todos)
    },
    remaining: function () {
      return filters.active(this.todos).length
    },
    allDone: {
      get: function () {
        return this.remaining === 0
      },
      set: function (value) {
        this.todos.forEach(function (todo) {
          todo.completed = value
        })
      }
    }
  },

  filters: {
    pluralize: function (n) {
      return n === 1 ? 'item' : 'items'
    }
  },

  methods: {
    addFromInput: function(todo) {
      alert(todo);
       var value = todo && todo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        id: todoStorage.uid++,
        title: value,
        completed: false
      })
    },
    

    removeTodo: function (todo) {
      this.todos.splice(this.todos.indexOf(todo), 1)
    },

    editTodo: function (todo) {
      this.beforeEditCache = todo.title
      this.editedTodo = todo
    },

    doneEdit: function (todo) {
      if (!this.editedTodo) {
        return
      }
      this.editedTodo = {}
      todo.title = todo.title.trim()
      if (!todo.title) {
        this.removeTodo(todo)
      }
    },

    cancelEdit: function (todo) {
      this.editedTodo = {}
      todo.title = this.beforeEditCache
    },

    removeCompleted: function () {
      this.todos = filters.active(this.todos)
    }
  },

  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}

</script>

<style>
[v-cloak] { display: none; }

div {
  background-image: url('https://www.datatrim.com/wp-content/uploads/2018/08/header-home-background-1900-1046.jpg');
}

.todoapp { 
  background-color: rgb(166, 195, 197);
}

.new-todo{
  margin: 1em;
}

.todo-list{
  padding: inherit;
}

.todo-list li .destroy {
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  transition: color 0.2s ease-out;
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
  background-color: #0d253bc7;
}

body {
  font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
  line-height: 1.4em;
  background: #f5f5f5;
  color: #4d4d4d;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todoapp {
    background: #fff;
    margin: 50px 0 40px 0;
    position: relative;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.filters {
    margin: 0;
    padding: 0;
    list-style: none;
    position: absolute;
    right: 0;
    left: 0;
}

.todo-list {
    margin: 0;
    padding: 0;
    list-style: none;
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
}

.todo-list li .toggle + label {
    background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22…2none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E);
    background-repeat: no-repeat;
    background-position: center left;
}

.todo-list li label {
    word-break: break-all;
    padding: 15px 15px 15px 60px;
    display: block;
    line-height: 1.2; 
    transition: color 0.4s; 
}

label {
    cursor: default;
}

.todo-list li {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;
}

ul {
    list-style-type: disc;
}

.todo-list li .toggle {
  text-align: center; 
  width: 40px; 
  height: auto; 
  position: absolute; 
  top: 0; 
  bottom: 0; 
  margin: auto 0; 
  border: none; 
}

.todo-list li.completed label {
    color: #d9d9d9;
    text-decoration: line-through;
}

.todo-list li {
    position: relative;
    font-size: 24px; 
    border-bottom: 1px solid #ededed;
}

.todo-list li .destroy:after {
    content: '×';
}

header {
    background-color: #0d253bc7;
}

.new-todo {
    padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(250, 249, 249, 0.918);
    box-shadow: inset 0 -2px 1px rgb(0, 0, 0);
}

.edit{
      padding: 16px 16px 16px 60px;
    border: none;
    background: rgba(250, 249, 249, 0.918);
    -webkit-box-shadow: inset 0 -2px 1px rgb(0, 0, 0);
    box-shadow: inset 0 -2px 1px rgb(0, 0, 0);
    background-color: white;
}

.view{
  display: flex
}
</style>
