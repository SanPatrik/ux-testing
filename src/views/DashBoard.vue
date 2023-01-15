<template class="v-card">
  <div class="search-container">

    <header>
      <h1 class="text-h4"><b>Dashboard</b></h1>
      <h2 class="text-h5">Welcome <b>$loggedUser</b></h2>
    </header>

    <div class="field is-grouped">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="Find a test">
      </div>
      <div class="control">
        <a class="button is-info">
          Search
        </a>
      </div>
    </div>

    <div>
      $browse tests for statistics
    </div>

  </div>
  <router-link to="/create">
    <button class="button is-primary rounded-pill" >Create new Test</button>
  </router-link>
  <FooterComp/>
</template>

<script>
import {defineComponent} from 'vue';

// Components
import FooterComp from "@/components/FooterComp";
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

// Exports
export default defineComponent({
  name: 'DashBoard',

  components: {
    FooterComp,

  },


  data(){
    return{
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