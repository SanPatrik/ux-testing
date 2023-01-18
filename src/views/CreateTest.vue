<template class="v-card">
    <form>
      <div class="search-container">
        <div class="field is-grouped">
          <div class="control is-expanded">
            <header>
              <h1 class="text-h4"><b>Test creator</b></h1>
              <v-text-field class="text-h5"
                  v-model="test.testName"
                  label="Insert test name"
                  placeholder="Test"
                            @change="getTestName"
              ></v-text-field>
            </header>
          </div>
        </div>
<!--        <TestingComp :question="test.questions[0].questionName" :index="0" @my-event="myEvent"></TestingComp>-->
        <div class="pb-5" v-for="(question, index) in test.questions" v-bind:key="question">
          <QuestionCard :index="index" @update-question="updateQuestion"></QuestionCard>
        </div>
        <button class="button is-primary rounded-circle is-mobile is-vcentered" @click="addQuestion()">+</button>
      </div>
    </form>

  <button class="button is-primary rounded-pill" @click="submitTest()">Create</button>
  <FooterComp/>
</template>

<script>
import {defineComponent, reactive, ref, toRaw,} from 'vue';
import {db} from '@/firebase';
import {collection, setDoc, doc} from 'firebase/firestore';

// Components
import FooterComp from "@/components/FooterComp";
import QuestionCard from "@/components/QuestionCard.vue";
// import TestingComp from "@/components/TestingComp.vue";
export default defineComponent({
  name: 'CreateTest',
  components: {
    FooterComp,
    QuestionCard
  },
  setup(){
    const test = reactive({
      testName: "",
      questions: ref([])
    })
    test.questions.push({});
    return {test}
  },
  methods:{
    updateQuestion(emit){
      this.test.questions[emit.index].value = emit.question;
      console.log(this.test)
    },
    addQuestion(){
      this.test.questions.push({})
    },
    async submitTest(){
      const testRef = await doc(collection(db, "Tests"))
      await setDoc(doc(db,testRef.path),{
        TestName: this.test.testName
      })
      for (const question of toRaw(this.test.questions)) {
        const questionRef = await doc(collection(db, testRef.path+"/Questions"))
        await setDoc(doc(db, questionRef.path),{
          Question: question.value.questionName,
          QuestionType: question.value.questionType
        })
        for (const answer of toRaw(question.value.answers.value)){
          const answerRef = await doc(collection(db, questionRef.path+"/Answers"))
          await setDoc(doc(db, answerRef.path),{
            Choice: answer.value.choice,
            Clicks: answer.value.clicks,
          })
        }
      }
    },
    getTestName(){
      console.log(this.test.testName);
    },
  }
});
</script>

<style scoped lang="scss">
.search-container{
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
</style>