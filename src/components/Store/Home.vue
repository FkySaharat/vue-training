<template>
    <div>
        Home store
        
    <v-stepper v-model="e1">
        <v-stepper-header>
            <v-stepper-step :complete="e1 > 1" step="1">Choose the product</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step :complete="e1 > 2" step="2">Summary Order</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">Thank you</v-stepper-step>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content step="1">
                <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
                >
                    <v-list-item two-line  v-for="(item, i) in this.foods" :key="i">
                        <v-list-item-content @click="Add(item)">
                            <v-list-item-title>{{item.name}} </v-list-item-title>
                            <v-list-item-subtitle>{{item.price}} baht x {{item.order}}</v-list-item-subtitle>

                        </v-list-item-content>
                    </v-list-item>

                </v-card>
                <div>sum : {{this.sum}}</div>
                <v-btn
                color="primary"
                @click="e1 = 2"
                >
                Order
                </v-btn>

                <v-btn text>Reset</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
                <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
                >
                <v-list-item two-line  v-for="(item, i) in this.choose" :key="i">
                        <v-list-item-content>
                            <v-list-item-title>{{item.name}} </v-list-item-title>
                            <v-list-item-subtitle>{{item.price}} baht x {{item.order}}</v-list-item-subtitle>

                        </v-list-item-content>
                </v-list-item>

                </v-card>
                <div>{{this.sum}}</div>
                <v-btn
                color="primary"
                @click="e1 = 3"
                >
                Comfirm
                </v-btn>

                <v-btn 
                @click="e1 = 1"
                text>Back</v-btn>
            </v-stepper-content>

            <v-stepper-content step="3">
                <v-card
                class="mb-12"
                color="grey lighten-1"
                height="200px"
                >
                Thank you !!!
                
                </v-card>
                
                <v-btn
                color="primary"
                @click="Reset()"
                >
                Home
                </v-btn>

                <!-- <v-btn text>Cancel</v-btn> -->
            </v-stepper-content>
            
        </v-stepper-items>
    </v-stepper>

    </div>
</template>
<script>

const food = [{name:"food1",price:25,order:0},{name:"food2",price:50,order:0},{name:"food3",price:45,order:0}]
export default {
     data () {
      return {
        e1: 1,
        foods:food,
        choose:[],
        sum:0
      }
    },
    methods:{
        Add:function(e){
            this.sum=this.sum+e.price
            let have = false
            this.choose=this.choose.map(item=>{
                if(item.name === e.name){
                    item.order+=1
                    have=true
                }
               return item
            })
            if(!have){
                e.order=1
                this.choose.push(e)
            }
            //this.choose=this.choose.filter((item,index)=>this.choose.indexOf(item)===index)
            
        },
        Reset:function(){
            this.e1=1;
            this.choose=[];
            this.sum=0;
             this.foods=this.foods.map(item=>{
                item.order=0
               return item
            })
        }

    }
}
</script>