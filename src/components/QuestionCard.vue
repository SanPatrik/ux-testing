<template>
    <div class="card">

        <div class="card-content">
            <b>
                <v-text-field
                        v-model="question.questionName"
                        label="Insert question"
                        placeholder="Question"
                        @change="getQuestion(); updateQuestion(question, index)"
                ></v-text-field>
            </b>

            <div class="content">
                <div class="columns is-mobile is-vcentered">

                    <div class="column has-text-left">

                        <div v-if="question.questionType === 'Radio' || question.questionType === 'Multi'">
                            <RadioAndMulti v-for="(answer, index) in question.answers" v-bind:key="answer" :index="index" @update-answer="updateAnswer"></RadioAndMulti>
                            <button class="button is-primary rounded-circle is-mobile is-vcentered" @click="addChoice()">+</button>
                        </div>

                        <div v-if="question.questionType === 'Heatmap'">
                            <HeatmapCreate v-for="(answer, index) in question.answers" v-bind:key="answer" :index="index" @update-answer="updateAnswer"></HeatmapCreate>
                        </div>

                        <div v-if="question.questionType === 'Textfield'">
                        </div>


                    </div>
                    <div class="column has-text-right is-5 is-align-self-flex-start">
                        <v-select
                                v-model="question.questionType"
                                :items="questionTypes"
                                item-text="type"
                                label="Type of question"
                                return-object
                                solo
                                @change="getQuestionType(); updateQuestion(question, index)"
                        ></v-select>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref} from "vue";
import RadioAndMulti from "@/components/RadioAndMulti.vue";
import HeatmapCreate from "@/components/HeatmapCreate.vue";

export default {
    name: "QuestionCard",
    components: {
        HeatmapCreate,
        RadioAndMulti,
    },
    props: {
        index: Number,
    },
    emits: ['updateQuestion', 'update-question'],
    setup() {
        const question = reactive({
            questionName: "",
            questionType: "Radio",
            answers: ref([])
        })
        question.answers.push({});
        const questionTypes = ["Radio", "Multi", "Textfield", "File NON FUNCTIONAL", "Heatmap", "Cardsort NON FUNCTIONAL"];
        return {question, questionTypes}
    },
    methods: {
        updateQuestion(question, index) {
            console.log(question);
            this.$emit('update-question', {question: question, index: index});
        },
        addChoice() {
            this.question.answers.push({});
        },
        updateAnswer(emit) {
            this.question.answers[emit.index].value = emit.answer;
            console.log(this.question);
        },
        getQuestion() {
            console.log(this.question.questionName);
        },
        getQuestionType() {
            console.log(this.question.questionType);
        },
    }
}
</script>

<style scoped>

</style>