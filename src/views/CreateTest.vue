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



        <div class="card">
          <div class="card-content">
            <b>
              <v-text-field
                            v-model="test.questions[0].question"
                            label="Insert question"
                            placeholder="Question"
                            @change="getQuestion(0)"
              ></v-text-field>
            </b>
            <div class="content">
              <div class="columns is-mobile is-vcentered">

                <div class="column has-text-left">
                  <div v-if="selectedType === 'Radio'">
                    <v-text-field
                        v-model="test.questions[0].answers[0].choice"
                        label="Insert choice"
                        placeholder="Choice"
                        filled
                        rounded
                        dense
                        @change="getQuestionChoice()"
                    ></v-text-field>
                  </div>
                </div>

                <div class="column has-text-right is-5">
                  <v-select
                      v-model="selectedType"
                      :items="questionType"
                      item-text="type"
                      label="Type of question"
                      return-object
                      solo
                      @change="getQuestionType(0)"
                  ></v-select>
                </div>


              </div>
            </div>
            <button class="button is-primary rounded-circle" @click="addQuestion()">+</button>
          </div>
        </div>
      </div>
    </form>

  <button class="button is-primary rounded-pill" >Create</button>
  <FooterComp/>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';

// Components
import FooterComp from "@/components/FooterComp";
export default defineComponent({
  name: 'CreateTest',

  components: {
    FooterComp,
  },
  props:{

  },
  setup(){
    const questionType = ["Radio", "Multi", "Input", "File", "Heatmap", "Cardsort"];
    return {questionType}
  },
  data(){
    const answer = reactive({
      choice: "",
      clicks: 0
    })
    const question = reactive({
      question: "",
      questionType: "",
      answers: ref([])
    })
    const test = reactive({
      testName: "",
      questions: ref([])
    })
    question.answers.push(answer);
    test.questions.push(question);
    return { selectedType: "Radio", test}
  },
  methods:{
    addQuestion(){

    },

    getTestName(){
      console.log(this.test.testName);
    },
    getQuestion(index){
      console.log(this.test.questions[index].question)
    },
    getQuestionType(index){
      console.log(this.test.questions[index].questionType)
    },
    getQuestionChoice(){
      console.log(this.test.questions[0].answers[0].choice)
    }
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