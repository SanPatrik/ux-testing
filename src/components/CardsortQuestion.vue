<template>
    <div class="mt-5">
        <div class=" is-align-items-stretch columns is-mobile is-vcentered">
            <div  class="mx-1 align-self-auto column bg-shades-white has-text-left card card-content" >
                <p class="row"><b>Cards</b></p>
                <p class="row" v-for="answer in question.answers" v-bind:key="answer">{{answer.choice}}</p>

            </div>
            <div v-for="tree in question.trees" v-bind:key="tree"
                 class="mx-1 align-self-auto column bg-shades-white has-text-right card card-content is-align-self-flex-start">
                <p class="row has-text-centered"><b>{{tree.name}}</b></p>

<!--                <input class="column has-text-right"-->
<!--                       :name="question.id" type="radio"-->
<!--                       :value="answer.ref" v-model="pickedAnswer"-->
<!--                       @change="pickedChoice(pickedAnswer)">-->
            </div>
        </div>
    </div>
</template>

<script>
import {updateDoc, increment, doc} from "firebase/firestore";
import {db} from "@/firebase";
import {toRaw, } from "vue";

export default {
    name: "CardsortQuestion",
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