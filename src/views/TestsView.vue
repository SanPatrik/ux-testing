<template >
  <header>
    <h1 class="text-h4"><b>{{$route.query.testName}}</b></h1>
    <h2 class="text-h5">Made by <b>{{$route.query.author}}</b></h2>
  </header>
  <section class="search-container">
    <form>
      <div class="card mb-5" v-for="question in questions" v-bind:key="question">
        <div class="card-content">
          <p><b>{{question.question}}</b></p>
          <div class="content">
            <RadioQuestion v-if="question.questionType === 'Radio'" :question="question" :isSubmitted="isSubmitted"></RadioQuestion>
            <MultiQuestion v-if="question.questionType === 'Multi'" :question="question" :isSubmitted="isSubmitted"></MultiQuestion>
          </div>
        </div>
      </div>
    </form>
    <button :disabled="isSubmitted" class="button is-primary rounded-pill" @click="submitTest()">Submit</button>
  </section>
</template>

<script>
import {reactive, ref} from "vue";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/firebase";
import MultiQuestion from "@/components/MultiQuestion.vue";
import RadioQuestion from "@/components/RadioQuestion.vue";

function getQuestions(testId){
  const questionsArray = ref([]);
  getDocs(collection(db,"Tests/"+testId+"/Questions")).then((questions)=> {
    questions.forEach( async question =>{
      const questionObj = reactive({
        answers: await getDocs(collection(db,question.ref.path+"/Answers")).then((answers)=>{
          const answersArray = ref([]);
          answers.forEach( answer =>{
            const answerObj = reactive({
              ref: answer.ref,
              choice: answer.data().Choice,
              clicks: answer.data().Clicks
            })
            answersArray.value.push(answerObj);
          })
          return answersArray;
        }),
        id: question.id,
        question: question.data().Question,
        questionType: question.data().QuestionType
      })
      questionsArray.value.push(questionObj)
    })
  })
  return questionsArray;
}

export default {
  components: {
    MultiQuestion,
    RadioQuestion,
  },
  name: "TestComp",
  props:{
    postId: String,
  },
  setup(props) {
    let questions = getQuestions(props.postId);
    console.log(questions);
    return {questions}
  },
  data(){
    return {isSubmitted: false}
  },
  methods:{
    submitTest(){
      this.isSubmitted = true;
    },
  }
}
</script>

<style scoped lang="scss">
.search-container{
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
</style>