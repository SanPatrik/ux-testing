<template>
    <div>
        <div class="columns is-mobile is-vcentered">
            <div>
                <label for="answer">Your answer:</label>
                <input type="text" id="answer" v-model="answer" />
            </div>
        </div>
    </div>
</template>

<script>
import {updateDoc, doc, arrayUnion} from "firebase/firestore";
import {db} from "@/firebase";
import {ref, toRaw} from "vue";

export default {
    name: "TextFieldQuestion",
    props:{
        question: Object,
        isSubmitted: Boolean
    },
    setup(){
        const answer = ref();
        return {answer}
    },
    watch:{
        async isSubmitted(submitted){
            if(submitted){
                await updateDoc(doc(db,toRaw(this.question.answers[0].ref).path),{
                    Answers: arrayUnion(this.answer)
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