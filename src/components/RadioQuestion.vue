<template>
  <div>
    <div class="columns is-mobile is-vcentered" v-for="answer in question.answers" v-bind:key="answer">
      <div class="column has-text-left" >
        <label>{{answer.choice}}</label>
      </div>
      <div>
        <input class="column has-text-right"
               :name="question.id" type="radio"
               :value="answer.ref" v-model="pickedAnswer"
               @change="pickedChoice(pickedAnswer)">
      </div>
    </div>
  </div>
</template>

<script>
import {updateDoc, increment, doc} from "firebase/firestore";
import {db} from "@/firebase";
import {toRaw} from "vue";

export default {
  name: "RadioQuestion",
  props:{
    question: Object,
    isSubmitted: Boolean
  },
  setup(){
    const pickedAnswer = "";
    return {pickedAnswer}
  },
  watch:{
    async isSubmitted(submitted){
      if(submitted){
        await updateDoc(doc(db,toRaw(this.pickedAnswer).path),{
              Clicks: increment(1)
            })
        this.$emit('function-completed', this.question);
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