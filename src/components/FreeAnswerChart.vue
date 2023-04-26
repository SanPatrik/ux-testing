<template>
    <div>
        <div class="is-mobile is-vcentered v-dialog--scrollable">
            <p v-for="answer in question.answers[0].answers" v-bind:key="answer"> {{answer}}</p>
        </div>
    </div>
</template>

<script>

export default {
    name: "FreeAnswerChart",
    props:{
        question: Object,
        isSubmitted: Boolean
    },
    setup(props){
        console.log(props.question.answers);
    },

}
</script>

<style scoped>

</style>