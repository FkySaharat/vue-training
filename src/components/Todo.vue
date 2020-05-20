<template>
  <v-app class="my-10">
    <v-card
        class="mx-auto"
        max-width="344"
        outlined
    >
      <v-col >
    <v-text-field
      label="Solo"
      placeholder="Text Input"
      solo
      @keydown.enter="addtodo"
      v-model="newtodo"
    />
      <v-card
        v-for="(todo, idx) in todos.slice().reverse()"
        v-bind:key="idx"
        :class="{check: todo.check}"
      >
        <input type="checkbox" v-model="todo.check" />
        {{ todo.text }}
      </v-card>
      </v-col>
    </v-card>
  </v-app>
</template>

<script>
const STORAGE_KEY = "todo-storage";

export default {
  data: () => ({
    newtodo: "",
    todos: []
  }),
  created() {
    this.todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  },
  methods: {
    addtodo() {
      if (this.newtodo != "") {
        this.todos.push({ id: this.todos.length, text: this.newtodo });
      } else {
        this.todos.push({ id: this.todos.length, text: "undefined" });
      }
      this.newtodo = "";
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    }
  }
};
</script>

<style scoped>
.check {
  text-decoration: line-through;
}
</style>