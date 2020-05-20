<template>
  <div style="height: 100%;">
    <h2>
      <i class="fas fa-th-list"></i>&nbsp;To do List
    </h2>
    <div class="input-panel">
      <input
        type="text"
        placeholder="Insert the thing that you would like to do"
        v-model="inputContent"
      />
      <button @click="addTodo(inputContent)">
        Add&nbsp;
        <i class="fas fa-plus-circle"></i>
      </button>
    </div>
    <div class="list-panel">
      <div class="list-item" v-for="(item, index) in todoList" :key="item.id">
        <div class="list-body">
          <span
            class="list-number"
            :class="{'num-done': item.done, 'num-undone': !item.done}"
          >{{index+1}}</span>&nbsp;
          <span class="list-content" :class="{isDone: item.done}">{{item.content}}</span>
          <span class="list-date">{{new Date(item.createDate).toDateString()}}</span>
        </div>
        <div class="list-action">
          <button
            :class="{'mark-done':!item.done, 'mark-undone':item.done}"
            @click="markToggle(item)"
          >{{item.done ? '&#10006;': '&#10004;'}}</button>
          <!-- <button class="mark-undone" v-else @click="markToggle(item)"><i class="fas fa-times"></i></button> -->
          <button class="delete">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="actions">
      <button>
        Clear Done&nbsp;
        <i class="fas fa-boxes"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  props: ["todoList"],
  data() {
    return {
      inputContent: ""
    };
  },
  methods: {
    addTodo(content) {
      this.$emit("addTodoItem", content);
      this.inputContent = "";
    },
    markToggle(li) {
      this.$emit("markToggle", li);
    }
  },
  watch: {
    // inputContent(curr, prev) {
    //   console.log(`${curr}, ${prev}`);
    // }
  }
};
</script>

<style>
.isDone {
  text-decoration: line-through;
}

.input-panel {
  display: flex;
  justify-content: center;
  height: 2.8rem;
}
.actions {
  display: flex;
  justify-content: center;
  margin: 0.25rem 0.1rem;
}

.actions button {
  border: none;
  background-color: #faec27da;
  padding: 1rem;
  font-weight: bold;
  border-radius: 0.5rem;
}

.actions button:hover {
  background-color: #faec27d5;
}

.actions button:active {
  background-color: #faec2780;
}
.list-panel {
  margin-top: 0.8rem;
  height: 90%;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.list-panel .list-item {
  height: 3.2rem;
  margin: 0.2rem 1.5rem;
  background-color: #ffffff18;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-item .list-action {
  display: flex;
  height: 100%;
  width: 20%;
}
.list-action button {
  width: 50%;
  border: none;
  font-size: 1rem;
  color: white;
}

.list-action .mark-done {
  background-color: rgba(175, 235, 54, 0.747);
}
.list-action .mark-done:hover {
  background-color: rgba(175, 235, 54, 0.603);
}
.list-action .mark-done:active {
  background-color: rgba(175, 235, 54, 0.438);
}
.list-action .mark-undone {
  background-color: #dad047e3;
}
.list-action .mark-undone:hover {
  background-color: #faec27ad;
}
.list-action .mark-undone:active {
  background-color: #faec2796;
}

.list-action .delete {
  background-color: rgba(255, 47, 47, 0.808);
}
.list-action .delete:hover {
  background-color: rgba(255, 47, 47, 0.705);
}
.list-action .delete:active {
  background-color: rgba(255, 47, 47, 0.582);
}
.list-item .list-body {
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 80%;
}
.list-body > span {
  padding: 0.6rem;
  display: flex;
  align-items: center;
}

.list-body .list-number {
  font-weight: bold;
  font-size: 1.2rem;
  width: 5%;
  justify-content: center;
}
.list-body .num-done {
  background-color: rgba(175, 235, 54, 0.747);
}
.list-body .num-undone {
  background-color: #faec27be;
}
.list-body .list-content {
  text-align: left;
  font-size: 1.25rem;
  font-weight: 200;
  width: 65%;
}
.list-body .list-date {
  width: 30%;
  font-size: 0.8rem;
  justify-content: center;
}

.input-panel > button,
input {
  border: none;
  margin: 0 0.1rem;
  padding: 0.5rem;
}

.input-panel button {
  width: 5rem;
  background-color: #ffffff88;
  color: white;
}
.input-panel button:hover {
  background-color: #ffffff41;
}
.input-panel button:active {
  background-color: #ffffff5e;
}

.input-panel input {
  background-color: #ffffffd3;
  color: black;
  width: 60%;
}
</style>