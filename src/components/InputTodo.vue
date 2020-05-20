<template>
  <v-container>
    <v-card 
      dark 
      class="mx-auto" 
      max-width="344"
      style="margin-top:30px" >
      <v-card-text>
        <v-text-field outlined label="Todo" v-model="message" @keydown.enter="AddTodoList" placeholder="Type Here!!!"></v-text-field>
      </v-card-text>  
    </v-card>  
      
      <ul>
        <li v-for="(item) in list" :key="item.message" :class="{checked: item.checked}">
          <div>
            <p v-if="item.checked===true" style="text-decoration: line-through">{{item.mes}}</p>
            <p v-else>{{item.mes}}</p>
            <input type="checkbox" v-model="item.checked" />
          </div>
        </li>
      </ul>
    
  </v-container>
</template>

<script>
const STORAGE_KEY ='todo-storage'

export default {
  name: "InputTodo",
  data: function() {
    return {
      message: "",
      list: []
    };
  },
  mounted() {
    this.list =JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  },
  methods: {
    AddTodoList: function() {
      if(this.message !== ""){
        this.list.push({ mes: this.message, checked: false });
        this.list.reverse();

        this.message = "";
        localStorage.setItem(STORAGE_KEY,JSON.stringify(this.list))
      }
      
    }
  }
};
</script>


<style >
</style>