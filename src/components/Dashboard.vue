<template>
  <div>
    <h1>Dashboard</h1>
    <TodoList></TodoList>
    <Archive></Archive>
  </div>
</template>

<script>
import Archive from "./Archive";
import TodoList from "./TodoList";
export default {
  name: "Dashboard",
  components: {Archive, TodoList}

}
</script>

<style>
h1{
  text-transform: uppercase;
  color: #ffffffec;
}
</style>