<template>
  <v-app>
    <v-tabs
      background-color="#F5F5F5"
      center-active
    >
     <v-tab> <router-link to='/'>Todo</router-link> </v-tab>
     <v-tab> <router-link to='/Store'>Store</router-link> </v-tab>
    </v-tabs>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style scoped>
  a{
    text-decoration: none
  } 
</style>