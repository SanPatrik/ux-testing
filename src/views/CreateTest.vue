<template class="v-card">
    <form>
        <div class="search-container">
            <div class="field is-grouped">
                <div class="control is-expanded">
                    <header>
                        <h1 class="text-h4"><b>Test creator</b></h1>
                        <v-text-field class="text-h5"
                                      v-model="test.testName"
                                      label="Insert test name"
                                      placeholder="Test"
                                      @change="getTestName"
                        ></v-text-field>
                    </header>
                </div>
            </div>
            <!--        <TestingComp :question="test.questions[0].questionName" :index="0" @my-event="myEvent"></TestingComp>-->
            <div class="pb-5" v-for="(question, index) in test.questions" v-bind:key="question">
                <QuestionCard :index="index" @update-question="updateQuestion"></QuestionCard>
            </div>
            <button class="button is-primary rounded-pill is-mobile is-vcentered" @click="addQuestion()">Add question
            </button>
        </div>
    </form>

    <button class="button is-primary rounded-pill" @click="createTest()">Create</button>
    <FooterComp/>
</template>

<script>
import {defineComponent, reactive, ref, toRaw,} from 'vue';
import router from "@/router";
import {db, storage, auth, storageRef, getDownloadURL, uploadBytes} from '@/firebase';
import {collection, setDoc, doc, arrayUnion} from 'firebase/firestore';

// Components
import FooterComp from "@/components/FooterComp";
import QuestionCard from "@/components/QuestionCard.vue";

// import TestingComp from "@/components/TestingComp.vue";
export default defineComponent({
    name: 'CreateTest',
    components: {
        FooterComp,
        QuestionCard
    },
    setup() {
        const test = reactive({
            testName: "",
            questions: ref([])
        })
        test.questions.push({});
        return {test}
    },
    methods: {
        updateQuestion(emit) {
            this.test.questions[emit.index].value = emit.question;
            console.log(this.test)
        },
        addQuestion() {
            this.test.questions.push({})
        },
        async createTest() {
            //Test document
            const testRef = await doc(collection(db, "Tests"))
            await setDoc(doc(db, testRef.path), {
                TestName: this.test.testName,
                Author: doc(db, 'Authors', auth.currentUser.uid)
            })

            //Question document
            for (const question of toRaw(this.test.questions)) {
                const questionRef = await doc(collection(db, testRef.path + "/Questions"))
                await setDoc(doc(db, questionRef.path), {
                    Question: question.value.questionName,
                    QuestionType: question.value.questionType
                })
                if (question.value.trees && question.value.questionType === "Cardsort"){
                    const arrayOfTrees = [];
                    for (const tree of toRaw(question.value.trees.value)) {
                        const treeRef = await doc(collection(db, questionRef.path + "/Trees"))
                        console.log(treeRef);
                        arrayOfTrees.push(tree.value.name);
                        await setDoc(doc(db, treeRef.path), {
                            Name: tree.value.name,
                        })
                    }
                    for (const answer of toRaw(question.value.answers.value)) {
                        const answerRef = await doc(collection(db, questionRef.path + "/Answers"))
                        console.log("Cardsort");
                        console.log(answerRef);
                        const insertionArray = [];
                        arrayOfTrees.forEach((treeName) => {
                            insertionArray.push({ [treeName]: 0 });
                        });
                        await setDoc(doc(db, answerRef.path), {
                            Choice: answer.value.choice,
                            Insertion: insertionArray,
                        })
                    }
                }

                //Answer document
                if (question.value.questionType === "Radio" || question.value.questionType === "Multi"){
                    for (const answer of toRaw(question.value.answers.value)) {
                        const answerRef = await doc(collection(db, questionRef.path + "/Answers"))
                        await setDoc(doc(db, answerRef.path), {
                            Choice: answer.value.choice,
                            Clicks: answer.value.clicks,
                        })
                    }
                }
                else if (question.value.questionType === "Heatmap" ) {
                    for (const answer of question.value.answers.value) {
                        const answerRef = await doc(collection(db, questionRef.path + "/Answers"))
                        const imageRef = storageRef(storage, `images/${answer.value.name}`);
                        await uploadBytes(imageRef, answer.value);
                        const imageURL = await getDownloadURL(imageRef);
                        console.log("Image uploaded:", imageURL);
                        await setDoc(doc(db, answerRef.path), {
                            Url: imageURL,
                        });
                    }
                }
                else if (question.value.questionType === "Compare" ) {
                    for (const answer of question.value.answers.value) {
                        const answerRef = await doc(collection(db, questionRef.path + "/Answers"))
                        const imageRef = storageRef(storage, `images/${answer.value.name}`);
                        await uploadBytes(imageRef, answer.value);
                        const imageURL = await getDownloadURL(imageRef);
                        console.log("Image uploaded:", imageURL);
                        await setDoc(doc(db, answerRef.path), {
                            Url: imageURL,
                            Clicks: 0,
                        });
                    }
                }
                else if (question.value.questionType === "Textfield" ) {
                    const answerRef = await doc(collection(db, questionRef.path + "/Answers"))
                    await setDoc(doc(db, answerRef.path), {
                        Answers: arrayUnion(),
                    });
                }
            }
            await router.push('/')
        },
        getTestName() {
            console.log(this.test.testName);
        },
    }
});
</script>

<style scoped lang="scss">
.search-container {
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
}
</style>