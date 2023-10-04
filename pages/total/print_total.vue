<template>
  <div class="main-total-page">
      <page-lists />
  </div>
</template>
<script>
import PageLists from "@page_components/main-total/PrintList.vue";

export default {
  name: "MainTotalPage",
  middleware: ['auth'],
  ssr: false,
  components: {
      PageLists,
  },
  head() {
      return {
          title: 'Total' + this.theAppTitle
      }
  },
}
</script>