<template>
  <!-- Criar componente -->
 <h1></h1>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent ({
  name: "SearchComponent",
})
</script>

<style scoped>

input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #b9b6b6;
  width: 100%;
  box-sizing: border-box;
}

input:focus {
  outline-color: #a9a9a9;
}

label {
  text-align: left;
  color: #3b536e;
}

.input-title {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2px;
}
</style>