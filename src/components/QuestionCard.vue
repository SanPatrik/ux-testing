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

                        <div v-if="question.questionType === 'Compare'">
                            <CompareCreate v-for="(answer, index) in question.answers" v-bind:key="answer" :index="index" @update-answer="updateAnswer"></CompareCreate>
                        </div>

                        <div v-if="question.questionType === 'Cardsort'">
                            <CardsortCreateCard v-for="(answer, index) in question.answers" v-bind:key="answer" :index="index" @update-answer="updateAnswer"></CardsortCreateCard>
                            <button class="button is-primary rounded-circle is-mobile is-vcentered" @click="addChoice()">+</button>
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
                        ></v-select>
                        <div v-if="question.questionType === 'Cardsort'">
                            <CardsortCreateTree v-for="(treeEntry, index) in question.trees" v-bind:key="treeEntry" :index="index" @update-tree="updateTree"></CardsortCreateTree>
                            <button class="button is-primary rounded-circle is-mobile is-vcentered" @click="addTree()">+</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref, watch} from "vue";
import RadioAndMulti from "@/components/RadioAndMultiCreate.vue";
import HeatmapCreate from "@/components/HeatmapCreate.vue";
import CompareCreate from "@/components/CompareCreate.vue";
import CardsortCreateTree from "@/components/CardsortCreateTree.vue";
import CardsortCreateCard from "@/components/CardsortCreateCard.vue";

export default {
    name: "QuestionCard",
    components: {
        CardsortCreateTree,
        CardsortCreateCard,
        CompareCreate,
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
            answers: ref([]),
            trees: ref([])
        })
        question.answers.push({});
        const questionTypes = ["Radio", "Multi", "Textfield", "Compare", "Heatmap", "Cardsort"];
        function questionTypeChange(question) {
            console.log("CLEAR ANSWERS");
            question.answers.splice(1, question.answers.length);
            question.trees.splice(0, question.trees.length);
            if (question.questionType === 'Compare' && question.answers.length < 2) question.answers.push({});
            while (question.questionType === 'Cardsort' && question.trees.length < 2) question.trees.push({});
        }
        watch(
            () => question.questionType,
            () => {
                questionTypeChange(question);
            }
        );
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
        addTree(){
            this.question.trees.push({});
        },
        updateAnswer(emit) {
            this.question.answers[emit.index].value = emit.answer;
            console.log(this.question);
        },
        updateTree(emit) {
            this.question.trees[emit.index].value = emit.tree;
            console.log(this.question);
        },
        getQuestion() {
            console.log(this.question.questionName);
        },
    }
}
</script>

<style scoped>

</style>