<template>
    <h5>
        <font color="#fffff;"> Check All </font>
        <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
    </h5>
</template>

<script>
export default {
    name: 'CheckAll',
    data(){
        return{
            CheckAll: ''
        }
    },
    methods: {
        addChack: function () {
            this.$emit('addChack',this.allDone);
        }
    }
}
</script>
