<template>
  <div id="app">
    <br/><br/>
    <img alt="Vue logo" src="https://i.ytimg.com/vi/hwhHyxN0MSk/maxresdefault.jpg" width="200" height="200">
    <TodoList msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import TodoList from './components/TodoList.vue'

export default {
  name: 'todo-list',
  components: {
    TodoList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
