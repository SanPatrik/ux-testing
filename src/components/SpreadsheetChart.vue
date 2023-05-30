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
                <tr v-for="answer in sortedInsertions" v-bind:key="answer">
                    <td class="align-self-auto"><b>{{ answer.choice }}</b></td>
                    <td v-for="insert in answer.insertion" v-bind:key="insert">{{ Object.values(insert)[0] }}</td>
                </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<script>

export default {
    name: "SpreadsheetChart",
    props:{
        question: Object,
        isSubmitted: Boolean
    },
    setup(){
    },
    computed: {
        sortedInsertions() {
            return this.question.answers.map(answer => {
                return {
                    ...answer,
                    insertion: answer.insertion.sort((a, b) => {
                        const aId = Object.keys(a)[0];
                        const bId = Object.keys(b)[0];
                        const aIndex = this.question.trees.findIndex(tree => tree.id === aId);
                        const bIndex = this.question.trees.findIndex(tree => tree.id === bId);
                        return aIndex - bIndex;
                    }),
                };
            });
        },
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