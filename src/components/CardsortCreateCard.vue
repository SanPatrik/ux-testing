<template>
    <v-text-field
            v-model="answer.choice"
            label="Insert card text"
            placeholder="Card text"
            filled
            rounded
            dense
            @change="getQuestionChoice(); updateAnswer(answer, index)"
    ></v-text-field>
</template>

<script>
import {reactive} from "vue";

export default {
    name: "CardsortCreateCard",
    props:{
        index: Number,
    },
    emits:['updateAnswer', 'update-answer'],
    setup(){
        const answer = reactive({
            choice: "",
            insertion: [],
        })
        return {answer}
    },
    methods:{
        updateAnswer(answer, index){
            console.log(answer);
            this.$emit('update-answer', {answer: answer, index:index});
        },
        getQuestionChoice(){
            console.log(this.answer.choice);
        },
    }
}
</script>

<style scoped>

</style>