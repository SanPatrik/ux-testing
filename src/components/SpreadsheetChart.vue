<template>
    <div>
        <div class="rows is-mobile is-vcentered">
            <v-table class="mx-2 mt-5" height="300px">
                <thead>
                <tr>
                    <th class="align-center">
                        <b>Cards</b>
                    </th>
                    <th v-for="tree in question.trees" v-bind:key="tree" class="align-center">
                        <b>{{ tree.name }}</b>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="answer in question.answers" v-bind:key="answer">
                    <td class="align-self-auto"><b>{{ answer.choice }}</b></td>
                    <td v-for="insert in answer.insertion" v-bind:key="insert">{{ Object.values(insert)[0] }}</td>
                </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<script>



import {toRaw} from "vue";

export default {
    name: "SpreadsheetChart",
    props:{
        question: Object,
        isSubmitted: Boolean
    },
    setup(props){
        console.log("Cardsort");
        console.log(toRaw(props.question));


        return {}
    },
}
</script>

<style scoped>
img{
    max-width: 40%;
}
td,th {
    vertical-align: center;
}
</style>