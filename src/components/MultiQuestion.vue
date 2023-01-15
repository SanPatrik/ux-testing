<template>
  <div class="columns is-mobile is-vcentered" v-for="answer in question.answers" v-bind:key="answer">
    <div class="column has-text-left" >
      <label>{{answer.choice}}</label>
    </div>
    <div>
      <input class="column has-text-right" :name="question.id" type="checkbox" :value="answer.choice">
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioQuestion",
  props:{
    question: Object,
  },
}
</script>

<style scoped>

</style>