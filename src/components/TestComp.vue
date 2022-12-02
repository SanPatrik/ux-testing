<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-mobile is-vcentered">
          <div class="column has-text-left">
            <div><b>{{test}}</b></div>
            <div>{{test}}</div>
          </div>
          <div class="column has-text-right is-5">
            <button class="button is-primary">Open</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import {defineComponent,  onMounted, ref} from 'vue';

// import {onMounted, ref} from "vue";

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