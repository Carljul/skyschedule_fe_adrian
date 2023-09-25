<template>
  <nuxt-link
      :to="link"
      target="_blank"
      class="p-2 border-solid border-2 border-green-600 rounded-md"
      exact
      @click="callAction">
      <span class="text-lg">Print</span>
  </nuxt-link>
</template>
<script>
export default {
  name: 'PrintButton',
  props: {
    link: {
      type: String,
      default: ''
    },
    action: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    callAction() {
      this.action();
    }
  }
}
</script>