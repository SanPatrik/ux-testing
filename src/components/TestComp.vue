<template class="v-card">
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-mobile is-vcentered">


          <div class="column has-text-left">
            <div><b>{{test.testName}}</b></div>
            <div>{{test.author.username}}</div>
<!--            <div v-for="question in test.questions" v-bind:key="question">-->
<!--              <div>{{question.question}} Type: {{question.questionType}}</div>-->
<!--              <ul v-for="answer in question.answers" v-bind:key="answer">-->
<!--                  <li>{{answer.choice}} NO clicks: {{answer.clicks}}</li>-->
<!--              </ul>-->
<!--            </div>-->
          </div>
          <div class="column has-text-right is-5">
            <router-link :to="{params: {postId: test.id}, name: 'TestView',
             query:{author: test.author.username, testName: test.testName}}">
              <button class="button is-primary">Open</button>
            </router-link>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {defineComponent,  onMounted, ref} from 'vue';

// import {onMounted, ref} from "vue";

import {} from "vue";

export default {
  name: "TestComp",
  props:{
    test: Object,
  },
  data(){
    console.log(this.test);
  },
  // setup(props){
  //   const test = ref();
  //   onMounted(()=>{
  //     console.log(props.test1)
  //     test.value = props.test1;
  //     return test;
  //   })
  //   console.log(test);
  //   return {test}
  // }
}
</script>

<style scoped>

</style>