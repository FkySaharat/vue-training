<template>
  <div>
    <h1>Dashboard</h1>
    <div class="tab-panel">
      <div class="tab-nav">
        <div @click="tabIndex=0" class="tab-nav-list" :class="{isActive : tabIndex===0}">
          <i class="fas fa-th-list"></i>&nbsp;
          <span>To do List</span>
        </div>
        <div @click="tabIndex=1" class="tab-nav-list" :class="{isActive : tabIndex===1}">
          <i class="fas fa-archive"></i>&nbsp;
          <span>Archive</span>
        </div>
      </div>
      <div class="tab-content">
        <div v-if="tabIndex === 0" class="tab-body">
          <TodoList @markToggle="markToggle" @addTodoItem="addTodo" :todoList="todoList"></TodoList>
        </div>
        <div v-if="tabIndex === 1" class="tab-body">
          <Archive></Archive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Archive from "./Archive";
import TodoList from "./TodoList";
export default {
  name: "Dashboard",
  components: { Archive, TodoList },
  data() {
    return {
      tabIndex: 0,
      tabNumber: 2,
      todoList: [],
      archiveList: []
    };
  },
  methods: {
    makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    addTodo(_content) {
      let _id = this.makeid(60);
      this.todoList.push({
        id: _id,
        content: _content,
        done: false,
        createDate: Date.now()
      });
    },
    markToggle(li){
      li.done = !li.done;
      this.storeTodoList();
    }
    ,
    getTodoList() {
      //todoList
      //get them form local storage
      if (this.storageAvailable) {
        let temp = JSON.parse(localStorage.getItem("todoList"))
        this.todoList = temp ? temp : [];
      }
    },
    getArchiveList() {
      //archiveList
      //get them from local storage
      if (this.storageAvailable("localStorage")) {
        let temp = JSON.parse(localStorage.getItem("archiveList"))
        this.archiveList = temp ? temp: [];
      }
    },
    storeTodoList() {
      //store todoList
      if (this.storageAvailable("localStorage")) {
        localStorage.setItem("todoList", JSON.stringify(this.todoList));
      }
    },
    storeArchiveList() {
      //store archiveList
      if (this.storageAvailable("localStorage")) {
        localStorage.setItem("archiveList", JSON.stringify(this.archiveList));
      }
    },
    storageAvailable(type) {
      var storage;
      try {
        storage = window[type];
        var x = "__storage_test__";
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
      } catch (e) {
        return (
          e instanceof DOMException &&
          // everything except Firefox
          (e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === "QuotaExceededError" ||
            // Firefox
            e.name === "NS_ERROR_DOM_QUOTA_REACHED") &&
          // acknowledge QuotaExceededError only if there's something already stored
          storage &&
          storage.length !== 0
        );
      }
    }
  },
  watch: {
    tabNumber: function(curr) {
      console.log(`TabNumber: ${curr}`);
    },
    tabIndex: function(curr, prev) {
      console.log(`currrent: ${curr}, previous: ${prev}`);
    },
    todoList: function(curr) {
      console.log("todo", curr);
    },
    archiveList: function(curr) {
      console.log("archive", curr);
    }
  },
  computed: {
  },
  created() {
    this.getTodoList();
    this.getArchiveList();
  },
  updated(){
    this.storeArchiveList();
    this.storeTodoList();
  }
};
</script>

<style>
h1 {
  text-transform: uppercase;
}

.tab-body {
  height: 80%;
}
.tab-panel {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1.2rem;
  width: 50rem;
  height: 70vh;
}
.tab-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.tab-nav .tab-nav-list {
  padding: 1rem;
  width: 100%;
  min-width: 5rem;
  background-color: #ffffff3a;
  cursor: pointer;
}
.tab-nav .tab-nav-list:hover {
  background-color: #ffffff56;
}

.tab-nav .isActive {
  background-color: #ffffff6c;
}

.tab-panel .tab-content {
  background-color: #ffffff18;
  height: 100%;
  overflow: auto;
}
</style>