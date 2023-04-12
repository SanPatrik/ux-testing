

<template>
  <Suspense>
  <v-app>
    <v-main>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/dashboard">Dashboard</router-link> |
        <router-link v-if="!isLoggedIn" to="/signIn">Sign in</router-link>
        <button v-else-if="isLoggedIn" @click="signOut">Sign out</button>

      </nav>
      <router-view/>
    </v-main>
  </v-app>
  </Suspense>
</template>

<script>

import {auth, firebaseSignOut, onAuthStateChanged} from "@/firebase";
import {ref} from "vue";
import router from "@/router";

export default {
  name: 'App',
  components: {},
  setup() {
      const currentUser = ref(null);
      const isLoggedIn = ref(false);

      onAuthStateChanged(auth, (user) => {
          currentUser.value = user;
          isLoggedIn.value = !!user;
      });

      return { currentUser, isLoggedIn };
  },

    methods: {
      async signOut() {
          try {
              await firebaseSignOut(auth);
              await router.push("/");
              console.log('User signed out');
          } catch (error) {
              console.error('Sign out error:', error);
          }
      },
  },

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

  a,button {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active, &.button {
       color: #42b983;
     }
  }
}
</style>
