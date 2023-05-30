<template>
    <div class="mt-5">
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
import {doc, runTransaction} from "firebase/firestore";
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
            coordinates.x = Math.floor(x);
            coordinates.y = Math.floor(y);
            // Normalize the coordinates
            // coordinates.x = x / imageRect.width;
            // coordinates.y = y / imageRect.height;
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
                const questionRef = doc(db, toRaw(this.question.answers[0].ref).path);

                await runTransaction(db, async (transaction) => {
                    const questionSnap = await transaction.get(questionRef);

                    let coordinates = questionSnap.get('Coordinates') || [];

                    const existingIndex = coordinates.findIndex(
                        (point) => point.x === this.coordinates.x && point.y === this.coordinates.y
                    );

                    if (existingIndex !== -1) {
                        // Increment the "value" by 1
                        coordinates[existingIndex].value += 1;
                    } else {
                        // Add a new object to the array
                        coordinates.push({ x: this.coordinates.x, y: this.coordinates.y, value: 1 });
                    }

                    // Update the document with the new coordinates array
                    transaction.set(questionRef, { Coordinates: coordinates }, { merge: true });
                });

                // await updateDoc(doc(db,toRaw(this.question.answers[0].ref).path),{
                //     Coordinates: arrayUnion({ x:this.coordinates.x, y:this.coordinates.y, value: 1})
                // })
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