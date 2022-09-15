<template>
  <button @click="$emit('clicked')"/>
</template>

<script>

export default {
  name: "ButtonItemOption",
  props: {
    actionABC: {
      type: Function,
      required: false,
    },
  },
  setup(props, emit) {

    const created = () => {
      emit('created')
    }

    return {
      created,
    }
  }
}
</script>

<style scoped>

</style>