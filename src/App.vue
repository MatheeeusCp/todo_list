<template>
  <CardComponent/>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import CardComponent from "./views/Card.vue"
export default defineComponent ({
  components: {
    CardComponent,
  }
})
</script>
<style>
html, body {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  padding: 2rem;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  color: #2c3e50;
  width: 100%;
  min-height: 100vh;
  background: #00416A;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E4E5E6, #00416A);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E4E5E6, #00416A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /*background: #12c2e9;*/
  /*background: -webkit-linear-gradient(to right, #f64f59, #c471ed, #12c2e9);  !* Chrome 10-25, Safari 5.1-6 *!*/
  /*background: linear-gradient(to right, #f64f59, #c471ed, #12c2e9); !* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ *!*/

}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>