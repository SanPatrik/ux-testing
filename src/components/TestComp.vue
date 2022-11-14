<template>
  <div class="card">
    <div class="card-content">
      <div class="content">
        <div class="columns is-mobile is-vcentered">
          <div class="column">{{city.id}}</div>
          <div class="column has-text-right is-5">
            <button class="button is-primary">Open</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestComp",
  props:{
    city: Object,
  }
}
</script>

<style scoped>

</style>