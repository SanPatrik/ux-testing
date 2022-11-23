<template>
  <v-app>
    <v-main>
      <nav>
        <router-link to="/">Home</router-link>

      </nav>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {},


  data: () => ({

  }),
}
</script>
<style lang="scss">
@import "/node_modules/bulma/css/bulma.min.css";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
       color: #42b983;
     }
  }
}
</style>
