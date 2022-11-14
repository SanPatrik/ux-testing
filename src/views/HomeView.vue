<template>
  <div class="search-container">
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

    <div v-for="city in array"
         v-bind:key="city">
      <TestComp class="mb-5" :city="city" ></TestComp>
    </div>

  </div>

  <FooterComp class="is-flex-align-items-flex-end mt-auto"></FooterComp>
</template>

<script>
import {defineComponent, ref} from 'vue';

// Components
import FooterComp from "@/components/FooterComp";
import TestComp from "@/components/TestComp";
import {db} from '@/firebase';
import { collection, getDocs } from 'firebase/firestore';

const array = ref([]);


async function getAllEntities(){
  const querySnapshot = await getDocs(collection(db, "cities"));
  let cities = [];
  querySnapshot.forEach((doc) => {
    const city = {
      id: doc.id,
      country: doc.data().country,
      name: doc.data().name,
      state: doc.data().state,
    }
    cities.push(city);
  });
  array.value = cities;

}
getAllEntities();


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
  name: 'HomeView',

  components: {
    FooterComp,
    TestComp,
  },
  data(){
    return{
      array: array
    }
  },
});
</script>
<style scoped>
.search-container{
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
</style>
