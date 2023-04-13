<template>
    <header>
        <h1 class="text-h4"><b>{{ $route.query.testName }}</b></h1>
        <h2 class="text-h5">Made by <b>{{ $route.query.author }}</b></h2>
    </header>
    <section class="search-container">
        <form>
            <div class="card mb-5" v-for="question in questions" v-bind:key="question">
                <div class="card-content">
                    <p><b>{{ question.question }}</b></p>
                    <div class="content">
                        <RadioQuestion :key="question" :name="question" v-if="question.questionType === 'Radio'" :question="question" :isSubmitted="isSubmitted" @function-completed="onChildFunctionCompleted"></RadioQuestion>
                        <MultiQuestion :key="question" :name="question" v-if="question.questionType === 'Multi'" :question="question" :isSubmitted="isSubmitted" @function-completed="onChildFunctionCompleted"></MultiQuestion>
                        <HeatmapQuestion :key="question" :name="question" v-if="question.questionType === 'Heatmap'" :question="question" :isSubmitted="isSubmitted" @function-completed="onChildFunctionCompleted"></HeatmapQuestion>
                        <TextFieldQuestion :key="question" :name="question" v-if="question.questionType === 'Textfield'" :question="question" :isSubmitted="isSubmitted" @function-completed="onChildFunctionCompleted"></TextFieldQuestion>
                    </div>
                </div>
            </div>
        </form>
        <button :disabled="isSubmitted" class="button is-primary rounded-pill" @click="submitTest()">Submit</button>
    </section>
</template>

<script>
import {computed, reactive, ref} from "vue";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase";
import MultiQuestion from "@/components/MultiQuestion.vue";
import RadioQuestion from "@/components/RadioQuestion.vue";
import HeatmapQuestion from "@/components/HeatmapQuestion.vue";
import router from "@/router";
import TextFieldQuestion from "@/components/TextFieldQuestion.vue";

function getQuestions(testId) {
    const questionsArray = ref([]);
    getDocs(collection(db, "Tests/" + testId + "/Questions")).then((questions) => {
        questions.forEach(async question => {
            const questionObj = reactive({
                id: question.id,
                question: question.data().Question,
                questionType: question.data().QuestionType,
                answers: await getDocs(collection(db, question.ref.path + "/Answers")).then((answers) => {
                    const answersArray = ref([]);
                    if (question.data().QuestionType === "Radio" || question.data().QuestionType === "Multi"){
                        answers.forEach(answer => {
                            const answerObj = reactive({
                                ref: answer.ref,
                                choice: answer.data().Choice,
                                clicks: answer.data().Clicks
                            })
                            answersArray.value.push(answerObj);
                        })
                    }
                    else if (question.data().QuestionType === "Heatmap" ){
                        answers.forEach(answer => {
                            const answerObj = reactive({
                                ref: answer.ref,
                                url: answer.data().Url
                            })
                            answersArray.value.push(answerObj);
                        })
                    }
                    else if (question.data().QuestionType === "Textfield" ){
                        answers.forEach(answer => {
                            const answerObj = reactive({
                                ref: answer.ref,
                                answers: answer.data().Answers
                            })
                            answersArray.value.push(answerObj);
                        })
                    }
                    return answersArray;
                }),
            })
            questionsArray.value.push(questionObj)
        })
    })
    return questionsArray;
}

export default {
    components: {
        TextFieldQuestion,
        MultiQuestion,
        RadioQuestion,
        HeatmapQuestion
    },
    name: "TestComp",
    props: {
        postId: String,
    },
    setup(props) {
        let questions = ref(getQuestions(props.postId));
        let isSubmitted = ref(false);
        let completedChildren = ref([]);

        function onChildFunctionCompleted(question) {
            if (question === null)
                return computed(
                    () => completedChildren.value.length === questions.value.length
                );
            if (!completedChildren.value.includes(question)) {
                completedChildren.value.push(question);
            }
            return computed(
                () => completedChildren.value.length === questions.value.length
            );
        }

        function waitForAllChildren() {
            return new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (completedChildren.value.length === questions.value.length) {
                        clearInterval(checkInterval);
                        resolve();
                    }
                }, 100);
            });
        }

        return {questions, isSubmitted, onChildFunctionCompleted, waitForAllChildren};
    },
    data() {

    },
    methods: {
        async submitTest() {
            this.isSubmitted = true;
            await this.waitForAllChildren();
            await router.push("/");
        }
    }
}
</script>

<style scoped lang="scss">
.search-container {
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
</style>