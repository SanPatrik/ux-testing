<template>
    <input type="file" accept="image/*" @change="onFileChange" />
</template>

<script>
import {ref} from "vue";

export default {
    name: "HeatmapCreate",
    props:{
        index: Number,
    },
    emits:['updateAnswer', 'update-answer'],
    setup(){
        // const selectedImage = ref(null);
        //
        // // function onFileChange(event) {
        // //     selectedImage.value = event.target.files[0];
        // // }
        //
        //
        // return { onFileChange, selectedImage }
    },
    methods:{
        onFileChange(event) {
            const selectedImage = ref(null);
            selectedImage.value = event.target.files[0];
            console.log(selectedImage.value)
            this.updateAnswer(selectedImage, this.index)
        },
        updateAnswer(answer, index){
            console.log(answer.value);
            this.$emit('update-answer', {answer: answer, index:index});
        },

    }
}
</script>

<style scoped>

</style>