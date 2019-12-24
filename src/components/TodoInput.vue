<template>
    <input class="new-todo" 
        autofocus autocomplete="off" 
        placeholder="What needs to be done?" 
        v-model="newTodo" @keyup.enter="addTodo">
</template>

<script>
export default {
    name: 'TodoInput',
    data(){
        return{
            newTodo: ''
        }
    },
    methods: {
        addTodo: function (){
            this.$emit('addTodo', this.newTodo);
        }
    }
}
</script>