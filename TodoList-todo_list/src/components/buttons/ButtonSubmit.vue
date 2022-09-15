<template>
  <button class="submit" type="submit">{{ text }}</button>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent ({
  name: "ButtonSubmit",
  props: {
    text: {
      type: String,
      required: false,
    }
  }
})
</script>

<style scoped>
button {
  font-size: 16px;
  color: #fff;
  line-height: 1.2;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  padding: 9px;
  width: 180px;
  display: flex;
  border-radius: 16px;
  border: none;
  background: #00416A;
}

button:hover {
  cursor: pointer;
  opacity: 0.8;
}
</style>