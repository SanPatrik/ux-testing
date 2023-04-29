<template>
    <div>
        <div class="rows is-mobile is-vcentered">
            <div class="row">
                <img v-for="answer in question.answers" v-bind:key="answer" class="m-2 elevation-20"  :src="answer.url" alt="Image not loaded">
            </div>
            <div>
                <canvas :id="question.id"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import {Chart} from "chart.js/auto";
import {onBeforeUnmount, onMounted, ref} from "vue";


export default {
    name: "HorizontalBarChart",
    props:{
        question: Object,
        isSubmitted: Boolean
    },
    setup(props){
        let chart = null;
        const clicks = ref([]);
        onMounted(() => {
            props.question.answers.forEach(answer => {
                clicks.value.push(answer.clicks);
            })
            console.log("clicks:  "+clicks.value);
            const ctx = document.getElementById(props.question.id);
            console.log(ctx);
            chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['# of Clicks'],
                    datasets: [{
                        label: 'Left picture',
                        data: [clicks.value[0]*-1],
                        borderWidth: 1
                    },
                        {
                        label: 'Right picture',
                        data: [clicks.value[1]],
                        borderWidth: 1
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: "Question type: "+props.question.questionType
                        }
                    },
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            stacked: true
                        }
                    }
                }
            });
        })
        onBeforeUnmount(() => {
            if (chart) {
                chart.destroy();
            }
        });

        return {clicks}
    },
}
</script>

<style scoped>
img{
    max-width: 40%;
}
</style>