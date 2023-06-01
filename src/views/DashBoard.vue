<template class="v-card">
  <div class="search-container">

    <header>
      <h1 class="text-h4"><b>Dashboard</b></h1>
      <h2 class="text-h5">Welcome <b>{{user.displayName}}</b></h2>
    </header>
      <router-link to="/create">
          <button class="button is-primary rounded-pill m-3" >Create new Test</button>
      </router-link>
<!--    <div class="field is-grouped">-->
<!--      <div class="control is-expanded">-->
<!--        <input class="input" type="text" placeholder="Find a test">-->
<!--      </div>-->
<!--      <div class="control">-->
<!--        <a class="button is-info">-->
<!--          Search-->
<!--        </a>-->
<!--      </div>-->
<!--    </div>-->

      <div v-for="test in tests" v-bind:key="test">
          <StatsComp  class="mb-5" :test="test" ></StatsComp>
      </div>

  </div>

  <FooterComp/>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {auth, db} from "@/firebase";
import FooterComp from "@/components/FooterComp";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import StatsComp from "@/components/StatsComp.vue";

//import TestComp from "@/components/TestComp";
//import {db} from '@/firebase';
//import { collection, getDocs } from 'firebase/firestore';
//const array = ref([]);
// const documentPath = 'cities/LA';
// Add a new document in collection "cities"
// setDoc(doc(db, "cities", "CZ"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });
//
// const docRef = doc(db, "cities", "LA");
// //const docSnap = await getDoc(docRef);
//
// // if (docSnap.exists()) {
//   console.log("Document data:", getDoc(docRef));
// // } else {
// //   // doc.data() will be undefined in this case
// //   console.log("No such document!");
// // }

function getTests() {
    const tests = ref([]);
    const testsRef = collection(db, "Tests");
    const authorRef = doc(db, 'Authors', auth.currentUser.uid);
    const q = query(testsRef, where('Author', '==', authorRef));

    getDocs(q).then(allTests => {
        allTests.forEach( async test => {
            const testObj = reactive({
                id: test.id,
                testName: test.data().TestName,
                author: test.data().Author ? (await getDoc(test.data().Author).then((author) =>{
                    return  reactive({
                        id: author.id,
                        username: author.data().Username,
                        email: author.data().Email,
                        password: author.data().Password,
                    })
                })) : ({username: "Unknown"}),
            });
            tests.value.push(testObj);
        })
    })
    return tests
}

export default defineComponent({
  name: 'DashBoard',

  components: {
      StatsComp,
      FooterComp,
  },
  setup(){
      let tests = getTests();
      return {tests}
  },
  data(){
    return{
        user: auth.currentUser
    }
  },
});
</script>

<style scoped lang="scss">

.search-container{
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
</style>