<template>
  <div class="dashboard">

    <h1>dashboard todo</h1>
    # all created tests
    # allow to view statistics
  </div>
  <router-link id="nav-router" to="/create">+</router-link>
  <footer-comp/>
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
#nav-router {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: right;
}
nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>