<template>
  <div class="input-title">
    <input id="input-title" class="input" type="text" name="text" @input="$emit('modelValue', $event.target.value)" :placeholder="text" :value="modelValue">
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent ({
  name: "SearchComponent",
  props: {
    text: {
      type: String,
    },
    modelValue: {
      type: String,
    },
    label: {
      type: String,
    }
  }
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
  width: 65%;
  gap: 2px;
}
</style>