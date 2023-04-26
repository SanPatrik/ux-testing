<template>
    <div>
        <div class="is-mobile is-vcentered">
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
    name: "PieChart",
    props:{
        question: Object,
        isSubmitted: Boolean
    },
    setup(props){
        let chart = null;
        const choices = ref([]);
        const clicks = ref([]);
        onMounted(() => {
            props.question.answers.forEach(answer => {
                choices.value.push(answer.choice);
                clicks.value.push(answer.clicks);
            })
            console.log("choices:  "+choices.value);
            console.log("clicks:  "+clicks.value);
            const ctx = document.getElementById(props.question.id);
            console.log(ctx);
            chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: choices.value,
                    datasets: [{
                        label: '# of Clicks',
                        data: clicks.value,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        title: {
                            display: true,
                            text: "Question type: "+props.question.questionType
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

        return {choices, clicks}
    },
}
</script>

<style scoped>

</style>