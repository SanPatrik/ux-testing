<template>
    <v-text-field
            v-model="tree.name"
            label="Insert tree"
            placeholder="Tree name"
            filled
            rounded
            dense
            @change="getQuestionTree(); updateTree(tree, index)"
    ></v-text-field>
</template>

<script>
import {reactive} from "vue";

export default {
    name: "CardsortCreateTree",
    props:{
        index: Number,
    },
    emits:['updateTree', 'update-tree'],
    setup(){
        const tree = reactive({
            name: "",
        })
        return {tree}
    },
    methods:{
        updateTree(tree, index){
            console.log(tree);
            this.$emit('update-tree', {tree: tree, index:index});
        },
        getQuestionTree(){
            console.log(this.tree.name);
        },
    }
}
</script>

<style scoped>

</style>