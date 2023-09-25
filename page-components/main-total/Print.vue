<template>
  <button
      to="/total/print_total"
      target="_blank"
      class="p-2 border-solid border-2 border-green-600 rounded-md"
      exact
      @click="callAction">
      <span class="text-lg">Print</span>
  </button>
</template>
<script>
export default {
  name: 'PrintButton',
  props: {
    type: {
      type: String,
      default: ''
    },
    date: {
      type: String,
      default: ''
    },
  },
  methods: {
    callAction() {
      var parsedDate = new Date(this.date)
      var formattedDate = parsedDate.getFullYear() + '-' + this.reformatSingleDigits((parsedDate.getMonth() + 1)) + '-' + this.reformatSingleDigits(parsedDate.getDate())
      window.open('/total/print_total?type='+this.type+'&date='+formattedDate, '_blank');
    },
    reformatSingleDigits(n) {
        return n > 9 ? "" + n: "0" + n;
    },
  }
}
</script>