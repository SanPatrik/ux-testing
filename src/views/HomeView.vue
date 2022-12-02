
<template>
  <nav>
    <router-link id="nav-router" to="/dashboard">Dashboard</router-link>
  </nav>

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

    <div>here:  {{tests[0]}}</div>
    <div  v-for="test in tests"
         v-bind:key="test">
      <TestComp  class="mb-5" v-if="test" :test="test" ></TestComp>
    </div>

  </div>

  <FooterComp class="is-flex-align-items-flex-end mt-auto"></FooterComp>
</template>

<script>
import {defineComponent, onMounted} from 'vue';
import {db} from '@/firebase';
import {collection, getDocs} from 'firebase/firestore';
// Components
import FooterComp from "@/components/FooterComp";
import TestComp from "@/components/TestComp";

// const documentPath = 'cities/LA';
// // Add a new document in collection "cities"
// setDoc(doc(db, "cities", "CZ"), {
//   name: "Los Angeles",
//   state: "CA",
//   country: "USA"
// });

// const docRef = doc(db, "cities", "LA");
// //const docSnap = await getDoc(docRef);

// // if (docSnap.exists()) {
//   console.log("Document data:", getDoc(docRef));
// // } else {
// //   // doc.data() will be undefined in this case
// //   console.log("No such document!");
// // }
// function parseTest(test){
//   const test1 = {
//     id: test.id,
//     testName: test.TestName,
//     author: test.Author,
//     questions: test.Questions,
//   }
//   return test1
// }

// async function queryAuthor(path) {
//   console.log(path)
//   return (await getDoc(path)).data();
// }



// function queryTests(){
//   let array = [];
//   // var clovek = {
//   //   iq: 150,
//   //   vyska: 175
//   // }
//   // array.push(clovek);
//   //
//   // clovek = {
//   //   iq: 100,
//   //   vyska: 190
//   // }
//   // array.push(clovek);
//
//   getDocs(collection(db, "Tests")).then(allTests => {
//     allTests.forEach( test =>{
//       const testObj = {
//         id: test.id,
//         testName: test.data().TestName,
//         author: test.data().Author,
//         questions: test.data().Questions,
//       };
//
//       // getDoc(testObj.author).then((author) =>{
//       //   testObj.author = {
//       //     id: author.id,
//       //     username: author.data().Username,
//       //     email: author.data().Email,
//       //     password: author.data().Password,
//       //   }
//       //   console.log(testObj.author);
//       // })
//       array.push(testObj);
//     })
//   });
//
//   // const queryTest = await getDocs(collection(db, "Tests"));
//   // // let array = [];
//   //
//   // // array = queryTest.docs.map(doc => parseTest(doc.data()))
//   // // console.log(array)
//   //
//   //
//   // queryTest.forEach((doc) => {
//   //   const test = {
//   //     id: doc.id,
//   //     testName: doc.data().TestName,
//   //     author: doc.data().Author,
//   //     questions: doc.data().Questions,
//   //   }
//   //
//   //   getDoc(test.author).then((author) =>{
//   //     test.author = {
//   //       id: author.id,
//   //       username: author.data().Username,
//   //     }
//   //     console.log(test.author)
//   //   })
//
//   // const authorObject =  queryAuthor(test.author);
//     // console.log(authorObject);
//     // authorObject.then(doc => {
//     //   test.author = {
//     //     username: doc.Username,
//     //     email: doc.Email,
//     //     password: doc.Password,
//     //   }
//     // })
//
//   //   array.push(test);
//   //   console.log(test);
//   // });
//   // const queryA = queryAuthor(test.author);
//   // queryA.then((doc) =>{
//   //   test.author = {
//   //     username: doc.Username,
//   //     email: doc.Email,
//   //     password: doc.Password,
//   //   }
//   //})
//
//   return array;
//
// }

// Exports
export default defineComponent({
  name: 'HomeView',

  components: {
    FooterComp,
    TestComp,
  },
  setup(){
    onMounted(async ()=>{
      let array = [];
      await getDocs(collection(db, "Tests")).then(allTests => {
          allTests.forEach( test =>{
            const testObj = {
              id: test.id,
              testName: test.data().TestName,
              author: test.data().Author,
              questions: test.data().Questions,
            };

            // getDoc(testObj.author).then((author) =>{
            //   testObj.author = {
            //     id: author.id,
            //     username: author.data().Username,
            //     email: author.data().Email,
            //     password: author.data().Password,
            //   }
            //   console.log(testObj.author);
            // })
            array.push(testObj);
          })
        })
      this.tests = array;
      console.log(this.tests);
    })
  },

  data(){

    return{
      tests: []
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

.search-container{
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
</style>
