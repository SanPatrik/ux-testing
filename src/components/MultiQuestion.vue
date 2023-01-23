<template>
  <div>
    <div class="columns is-mobile is-vcentered" v-for="answer in question.answers" v-bind:key="answer">
      <div class="column has-text-left" >
        <label>{{answer.choice}}</label>
      </div>
      <div>
        <input class="column has-text-right"
               :name="question.id" type="checkbox"
               :value="answer.ref" v-model="pickedAnswers"
               @change="pickedChoice(pickedAnswers)">
      </div>
    </div>
  </div>
</template>

<script>
import {toRaw} from "vue";
import {doc, increment, updateDoc} from "firebase/firestore";
import {db} from "@/firebase";

export default {
  name: "RadioQuestion",
  props:{
    question: Object,
    isSubmitted: Boolean
  },
  data(){
    return {pickedAnswers: []}
  },
  watch:{
    isSubmitted(submitted){
      if(submitted){
        toRaw(this.pickedAnswers).forEach(async pickedAnswer =>{
          await updateDoc(doc(db,toRaw(pickedAnswer).path),{
            Clicks: increment(1)
          })
        })
      }
    }
  },
  methods:{
    pickedChoice(pickedAnswer){
      console.log(pickedAnswer);
    }
  }
}
</script>

<style scoped>

</style>