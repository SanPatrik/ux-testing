
<template class="v-card">
<!--  <nav class="pb-16">-->
<!--    <router-link id="nav-router" to="/dashboard">Dashboard</router-link>-->
<!--  </nav>-->

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
<!--    <div>{{tests[0]}}</div>-->
    <div v-for="test in tests" v-bind:key="test">
      <TestComp  class="mb-5" :test="test" ></TestComp>
    </div>

  </div>


  <FooterComp/>
</template>

<script>
import {defineComponent, reactive, ref} from 'vue';
import {db} from '@/firebase';
import {collection, getDocs, getDoc} from 'firebase/firestore';
// Components
import FooterComp from "@/components/FooterComp";
import TestComp from "@/components/HomViewTestComp.vue";

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
//
// async function queryTests(){
//   let array = [];
//   // let getTests = await getDocs(collection(db, "Tests"));
//
//   getDocs(collection(db, "Tests")).then(allTests => {
//     allTests.forEach(async test => {
//       // let tempAuthor = await getDoc(test.data().Author);
//       const testObj = {
//         id: test.id,
//         testName: test.data().TestName,
//         // author: test.data().Author,
//         author: await getDoc(test.data().Author).then((author) =>{
//           return {
//             id: author.id,
//             username: author.data().Username,
//             email: author.data().Email,
//             password: author.data().Password,
//           }
//         }),
//         questions: test.Questions,
//       };
//     // allTests.forEach(test => {
//     //   const testObj = {
//     //     id: test.id,
//     //     testName: test.data().TestName,
//     //     // author: test.data().Author,
//     //     author: getDoc(test.data().Author).then((author) =>{
//     //       return {
//     //         id: author.id,
//     //         username: author.data().Username,
//     //         email: author.data().Email,
//     //         password: author.data().Password,
//     //       }
//     //     }),
//     //     questions: test.data().Questions,
//     //   };
//     // getDoc(testObj.author).then((author) =>{
//     //   testObj.author = {
//     //     id: author.id,
//     //     username: author.data().Username,
//     //     email: author.data().Email,
//     //     password: author.data().Password,
//     //   }
//     //   console.log(testObj.author);
//     // })
//       array.push(testObj);
//
//     })
//
//     console.log(array)
//     return array
//   })
//   // const arrayPromises = array.map(async (test) =>{
//   //   return await test
//   // });
//   // return await Promise.all(arrayPromises);
//
//   // return new Promise((getTests) => {
//   //   getTests.then(allTests => {
//   //     allTests.forEach(test => {
//   //       const testObj = {
//   //         id: test.id,
//   //         testName: test.data().TestName,
//   //         // author: test.data().Author,
//   //         author: getDoc(test.data().Author).then((author) =>{
//   //           return {
//   //             id: author.id,
//   //             username: author.data().Username,
//   //             email: author.data().Email,
//   //             password: author.data().Password,
//   //           }
//   //         }),
//   //         questions: test.data().Questions,
//   //       };
//   //       // allTests.forEach(test => {
//   //       //   const testObj = {
//   //       //     id: test.id,
//   //       //     testName: test.data().TestName,
//   //       //     // author: test.data().Author,
//   //       //     author: getDoc(test.data().Author).then((author) =>{
//   //       //       return {
//   //       //         id: author.id,
//   //       //         username: author.data().Username,
//   //       //         email: author.data().Email,
//   //       //         password: author.data().Password,
//   //       //       }
//   //       //     }),
//   //       //     questions: test.data().Questions,
//   //       //   };
//   //
//   //       // getDoc(testObj.author).then((author) =>{
//   //       //   testObj.author = {
//   //       //     id: author.id,
//   //       //     username: author.data().Username,
//   //       //     email: author.data().Email,
//   //       //     password: author.data().Password,
//   //       //   }
//   //       //   console.log(testObj.author);
//   //       // })
//   //       array.push(testObj);
//   //
//   //     })
//   //
//   //     console.log(array)
//   //   });
//   // }).then((array) => {
//   //   this.foo = array;
//   // })
//
// //   // var clovek = {
// //   //   iq: 150,
// //   //   vyska: 175
// //   // }
// //   // array.push(clovek);
// //   //
// //   // clovek = {
// //   //   iq: 100,
// //   //   vyska: 190
// //   // }
// //   // array.push(clovek);
// //
// //   getDocs(collection(db, "Tests")).then(allTests => {
// //     allTests.forEach( test =>{
// //       const testObj = {
// //         id: test.id,
// //         testName: test.data().TestName,
// //         author: test.data().Author,
// //         questions: test.data().Questions,
// //       };
// //
// //       // getDoc(testObj.author).then((author) =>{
// //       //   testObj.author = {
// //       //     id: author.id,
// //       //     username: author.data().Username,
// //       //     email: author.data().Email,
// //       //     password: author.data().Password,
// //       //   }
// //       //   console.log(testObj.author);
// //       // })
// //       array.push(testObj);
// //     })
// //   });
// //
// //   // const queryTest = await getDocs(collection(db, "Tests"));
// //   // // let array = [];
// //   //
// //   // // array = queryTest.docs.map(doc => parseTest(doc.data()))
// //   // // console.log(array)
// //   //
// //   //
// //   // queryTest.forEach((doc) => {
// //   //   const test = {
// //   //     id: doc.id,
// //   //     testName: doc.data().TestName,
// //   //     author: doc.data().Author,
// //   //     questions: doc.data().Questions,
// //   //   }
// //   //
// //   //   getDoc(test.author).then((author) =>{
// //   //     test.author = {
// //   //       id: author.id,
// //   //       username: author.data().Username,
// //   //     }
// //   //     console.log(test.author)
// //   //   })
// //
// //   // const authorObject =  queryAuthor(test.author);
// //     // console.log(authorObject);
// //     // authorObject.then(doc => {
// //     //   test.author = {
// //     //     username: doc.Username,
// //     //     email: doc.Email,
// //     //     password: doc.Password,
// //     //   }
// //     // })
// //
// //   //   array.push(test);
// //   //   console.log(test);
// //   // });
// //   // const queryA = queryAuthor(test.author);
// //   // queryA.then((doc) =>{
// //   //   test.author = {
// //   //     username: doc.Username,
// //   //     email: doc.Email,
// //   //     password: doc.Password,
// //   //   }
// //   //})
// //
// //   return array;
// //
// }

function getTests() {
  const tests = ref([]);
  getDocs(collection(db, "Tests")).then(allTests => {
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
        // questions: await getDocs(collection(db,test.ref.path+"/Questions")).then((questions)=> {
        //   const questionsArray = ref([]);
        //   questions.forEach( async question =>{
        //     const questionObj = reactive({
        //       answers: await getDocs(collection(db,question.ref.path+"/Answers")).then((answers)=>{
        //         const answersArray = ref([]);
        //         answers.forEach( answer =>{
        //           const answerObj = reactive({
        //             choice: answer.data().Choice,
        //             clicks: answer.data().Clicks
        //           })
        //           answersArray.value.push(answerObj);
        //         })
        //         return answersArray;
        //       }),
        //       question: question.data().Question,
        //       questionType: question.data().QuestionType
        //     })
        //     questionsArray.value.push(questionObj)
        //   })
        //   return questionsArray;
        // })
      });
      tests.value.push(testObj);
    })
    // console.log(tests)
  })
  // console.log(tests)
  return tests
}

// Exports
export default defineComponent({
  name: 'HomeView',

  components: {
    FooterComp,
    TestComp,
  },
  setup(){
    // let tests = ref(queryTests());
    // queryTests()
    //console.log(tests)
    // let array;
    // onMounted(async ()=>{
    //   array = queryTests();
    //   tests.value = await array;
      // onMounted(async ()=>{
      //   let array = ref([]);
      //   await getDocs(collection(db, "Tests")).then(allTests => {
      //       allTests.forEach( test =>{
      //         const testObj = {
      //           id: test.id,
      //           testName: test.data().TestName,
      //           author: test.data().Author,
      //           questions: test.data().Questions,
      //         };
      //
      //         // getDoc(testObj.author).then((author) =>{
      //         //   testObj.author = {
      //         //     id: author.id,
      //         //     username: author.data().Username,
      //         //     email: author.data().Email,
      //         //     password: author.data().Password,
      //         //   }
      //         //   console.log(testObj.author);
      //         // })
      //         array.value.push(testObj);
      //       })
      //     })
      //   this.tests = array;
      //   console.log(this.tests);
      // })
      // console.log(tests.value);
      // return tests.value
    // })
    // let getTests = await getDocs(collection(db, "Tests"));
    // allTests.forEach(test => {
    //   const testObj = {
    //     id: test.id,
    //     testName: test.data().TestName,
    //     // author: test.data().Author,
    //     author: getDoc(test.data().Author).then((author) =>{
    //       return {
    //         id: author.id,
    //         username: author.data().Username,
    //         email: author.data().Email,
    //         password: author.data().Password,
    //       }
    //     }),
    //     questions: test.data().Questions,
    //   };
    // getDoc(testObj.author).then((author) =>{
    //   testObj.author = {
    //     id: author.id,
    //     username: author.data().Username,
    //     email: author.data().Email,
    //     password: author.data().Password,
    //   }
    //   console.log(testObj.author);
    // })
    // let tempAuthor = await getDoc(test.data().Author);
    // author: test.data().Author,
    let tests = getTests();
    // tests.push();
    // console.log(tests);

    return {tests}


    // const data = getData;
    // console.log(data);
    // console.log("3")
    // return {data}
  },
  // data(){
  //
  //   return{
  //     tests: this.tests
  //   }
  // },
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
