import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        foodmenu: []
    },
    mutations: {
        addFoodMenu( state, { payload }){
            state.foodmenu.push( payload )
          }
    },
    actions: {
        addFoodMenu({ commit }, payload) {
            commit("addFoodMenu", { payload });
          }
    },
    getters: {
        foodmenu: state => state.foods
      }
})