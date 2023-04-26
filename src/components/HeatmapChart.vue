<template>
    <div>
        <div class="is-mobile is-vcentered">
            <div :id="question.id"><img :src="question.answers[0].url" alt="Image not loaded" @load="initializeHeatmap"></div>
        </div>
    </div>
</template>

<script>
import {toRaw} from "vue";
import heatmap from 'heatmap.js'
export default {
    name: "HeatmapChart",
    props:{
        question: Object,
        isSubmitted: Boolean
    },
    setup(props){
        const initializeHeatmap = () => {
            if (!toRaw(props.question.answers[0].coordinates)) return;
            var heatmapInstance = heatmap.create({
                container: document.getElementById(props.question.id)
            });

            console.log(toRaw(props.question.answers[0].coordinates));
            const maxValue = Math.max(...toRaw(props.question.answers[0].coordinates).map(point => point.value));
            console.log('Highest value:', maxValue);

            var data = {
                max: maxValue,
                data: toRaw(props.question.answers[0].coordinates)
            };
            heatmapInstance.setData(data);
        }
        return {initializeHeatmap}
    },

}
</script>

<style scoped>

</style>