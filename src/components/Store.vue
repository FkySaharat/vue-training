<template>
  <v-app>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">Menu</v-stepper-step>
        <v-divider />
        <v-stepper-step :complete="e1 > 2" step="2">Oder</v-stepper-step>
        <v-divider />
        <v-stepper-step step="3">Success</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <div class="my-6">
            <v-card class="mx-auto" max-width="344" outlined>
              <div
                v-for="(food, idx) in foods"
                v-bind:key="idx"
                @click="addFoodMenu(food.name , food.price) ,total += food.price "
              >{{ food.name }} {{ food.price}} Bath
              </div>
            </v-card>
          </div>
          <div class="mx-auto" >total : {{total}} Bath</div>
        <v-btn class="mx-auto" @click="e1 = 2" text small color="primary">confirm</v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-card class="mb-12"  outlined>
            <div
                v-for="(food, idx) in foodmenu"
                v-bind:key="idx"
              >{{ food.name }} {{ food.price}} Bath
              </div>
          </v-card>
          <div class="mx-auto" >total : {{total}} Bath</div>
          <v-btn class="mx-auto" @click="e1 = 3, total = 0, foodmenu = []" text small color="primary">confirm</v-btn>

        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" outlined>
              Success!!!
          </v-card>
          <v-btn class="mx-auto" @click="e1 = 1" text small color="primary">confirm</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    e1: 1,
    foodmenu: [],
    food: {
      name:'',
      price: 0
    },
    foods: [
      {
        name: "Roast chicken",
        price: 25
      },
      {
        name: "Spicy minced beef",
        price: 40
      },
      {
        name: "Papaya salad",
        price: 45
      },
      {
        name: "Steamed rice",
        price: 5
      },
      {
        name: "Glutinous rice, Sticky rice",
        price: 10
      }
    ],
    total: 0
  }),
  methods: {
    addFoodMenu(foodName, foodPrice) {
      this.foodmenu.push({ name: foodName, price: foodPrice})
      console.log('foodmenu')
    }
  }
}
</script>