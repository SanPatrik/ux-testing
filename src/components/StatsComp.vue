<template class="v-card">
    <div class="card">
        <div class="card-content">
            <div class="content">
                <div class="columns is-mobile is-vcentered">

                    <div class="column has-text-left">
                        <div><b>{{test.testName}}</b></div>
                        <div>{{test.author.username}}</div>
                    </div>

                    <div class="column has-text-right is-5">
                        <router-link :to="{params: {postId: test.id}, name: 'StatisticsView',
             query:{author: test.author.username, testName: test.testName}}">
                            <button class="button is-danger">View</button>
                        </router-link>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import {defineComponent,  onMounted, ref} from 'vue';

// import {onMounted, ref} from "vue";


export default {
    name: "StatsComp",
    props:{
        test: Object,
    },


}
</script>

<style scoped>

</style>