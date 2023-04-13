<template>
    <div>
        <div class="columns is-mobile is-vcentered image-container" @click="getImageCoordinates">
            <img :src="question.answers[0].url" alt="Image not loaded">
            <div
                v-if="showEffect"
                class="click-effect"
                :style="{ top: effectPosition.y + 'px', left: effectPosition.x + 'px' }"
            ></div>
        </div>
    </div>
</template>

<script>
// import {updateDoc, increment, doc} from "firebase/firestore";
// import {db} from "@/firebase";
// import {toRaw} from "vue";

import {doc, updateDoc, arrayUnion} from "firebase/firestore";
import {db} from "@/firebase";
import {reactive, ref, toRaw} from "vue";

export default {
    name: "HeatmapQuestion",
    props:{
        question: Object,
        isSubmitted: Boolean
    },
    setup(){
        const showEffect = ref(false);
        const effectPosition = reactive({ x: 0, y: 0 });
        const coordinates = reactive({x: null, y: null})
        function getImageCoordinates(event) {
            const imageRect = event.target.getBoundingClientRect();
            const x = event.clientX - imageRect.left;
            const y = event.clientY - imageRect.top;

            // Normalize the coordinates
            coordinates.x = x / imageRect.width;
            coordinates.y = y / imageRect.height;
            // Show the circle effect
            showEffect.value = true;
            effectPosition.x = x;
            effectPosition.y = y;
            // Hide the circle effect after a short delay
            setTimeout(() => {
                showEffect.value = false;
            }, 500);
            console.log("Normalized image coordinates:", coordinates.x, coordinates.y);
        }

        return {coordinates, getImageCoordinates, showEffect, effectPosition}
    },
    watch:{
        async isSubmitted(submitted){
            if(submitted){
                await updateDoc(doc(db,toRaw(this.question.answers[0].ref).path),{
                    Coordinates: arrayUnion({ x:this.coordinates.x, y:this.coordinates.y })
                })
                this.$emit('function-completed', this.question);
            }
        }
    },
    methods:{
        pickedChoice(pickedAnswer){
            console.log(pickedAnswer);
        }
    }
}
</script>

<style scoped>
.image-container {
    position: relative;
    display: inline-block;
}

.click-effect {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgb(0, 207, 178);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
}
</style>