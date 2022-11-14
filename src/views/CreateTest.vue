<template>
  <div class="create">
    <h1>Create your own test</h1>
  </div>
  <footer-comp></footer-comp>
</template>

<script>
import { defineComponent } from 'vue';

// Components
import FooterComp from "@/components/FooterComp";
export default defineComponent({
  name: 'CreateTest',

  components: {
    FooterComp,
  },
});
</script>

<style scoped lang="scss">

</style>