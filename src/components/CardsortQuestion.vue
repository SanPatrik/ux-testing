<template>
    <div class="mt-5">
        <div class=" is-align-items-stretch columns is-mobile is-vcentered">
            <div  class="trees mx-1 align-self-auto column bg-shades-white has-text-left card card-content" >
                <p class="row"><b>Cards</b></p>
                <draggableComponent
                    v-model="answers"
                    group="trees"
                    :disabled="!enabled"
                    class="list-group"
                    item-key="id"
                    ghost-class="ghost"
                    @start="dragging = true"
                    @end="dragging = false"
                    :move="checkMove">
                    <template  #item="{element} ">
                        <div class="list-group-item" :class="{ 'not-draggable': !enabled }">{{element.choice}}</div>
                    </template>
                </draggableComponent>


            </div>
            <div v-for="tree in arrayOfTrees" v-bind:key="tree"
                 class="mx-1 align-self-auto column bg-shades-white card card-content has-text-left is-align-self-flex-start">
                <p class="row"><b>{{tree.name}}</b></p>

                <draggable-component
                    v-model="tree.insertedChoices"
                    group="trees"
                    :disabled="!enabled"
                    class="list-group"
                    item-key="id"
                    ghost-class="ghost"
                    @start="dragging = true"
                    @end="dragging = false"
                    :move="checkMove">
                    <template  #item="{element}">
                        <div class="list-group-item">{{element.choice}}</div>
                    </template>
                </draggable-component>
            </div>
        </div>
    </div>
</template>

<script>
import {updateDoc, doc, arrayUnion, arrayRemove} from "firebase/firestore";
import {db} from "@/firebase";
import {ref, toRaw} from "vue";
import draggableComponent from "vuedraggable";

export default {
    name: "CardsortQuestion",
    components: {
        draggableComponent,
    },
    props:{
        question: Object,
        isSubmitted: Boolean
    },
    setup(props){
        const answers = ref(toRaw(props.question.answers));
        const arrayOfTrees = ref([]);
        const dragging = false;
        const enabled = true;

        console.log(toRaw(props.question.trees));
        toRaw(props.question.trees).forEach(tree =>{
            arrayOfTrees.value.push({
                id: tree.id,
                name: tree.name,
                insertedChoices: []
            })
        })
        console.log(answers)
        console.log(arrayOfTrees)
        return {answers, arrayOfTrees, dragging, enabled}
    },
    watch:{
        isSubmitted(submitted){
            if(submitted){
                this.enabled = false;
                toRaw(this.arrayOfTrees).forEach(tree => {
                    console.log(tree.name);
                    toRaw(tree.insertedChoices).forEach(async choice => {
                        const element = toRaw(choice).insertion.find(item => Object.keys(item).includes(String(tree.id)));
                        const value = element ? element[tree.id] : null;
                        const elementToUpdate = { [tree.id]: value };
                        const updatedElement = { [tree.id]: value + 1 };
                        await updateDoc(doc(db,toRaw(choice).ref.path), {
                            Insertion: arrayRemove(elementToUpdate),
                        });
                        await updateDoc(doc(db,toRaw(choice).ref.path),{
                            Insertion: arrayUnion(updatedElement),
                        });
                    })

                })
                this.$emit('function-completed', this.question);
            }
        }
    },
    methods:{

        checkMove: function(e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        }
    }
}
</script>

<style scoped>
.list-group{
    min-height: 20px;
}
.trees{
    min-height: 20vh;
}
</style>