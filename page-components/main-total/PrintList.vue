<template>
  <div class="index-time-sheet-lists">
      <div v-if="state.entry.loading" class="loader-background">
          <div class="loader-container">
              <loader class="m-auto" style="display:block;" />
              <p>Preparing Data</p>
          </div>
      </div>
      <iframe v-if="!state.entry.loading && printLink != null" :src="printLink" class="printFrame"></iframe>
  </div>
</template>
<script>
import Loader from "@components/reusables/Loader.vue";

import { mapState, mapMutations, mapActions } from "vuex"

export default {
  name: 'MainTotalLists',
  components: {
    Loader,
  },
  data() {
    return {
      printLink: ''
    };
  },
  computed: {
    ...mapState({
      state: state => state.main.total.state,
      print: state => state.main.total.print,
    }),
  },
  watch: {
    print: function(newdata, olddata) {
      this.printLink = newdata;
    }
  },
  methods: {
    ...mapMutations('main/total', [
        'setState',
        'setToPrint'
    ]),
    ...mapActions('main/total', [
        'fetchToPrint'
    ]),
    alert(message) {
      alert(message)
    }
  },
  async created() {
    await this.fetchToPrint();
    this.printLink = this.print
    // if (this.print == null) {
    //     this.alert('File is too large');
    //     // window.close();
    // }
  },
}
</script>
<style scoped>
  .loader-background {
      position: absolute;
      background-color: #808080a6;
      width: 100%;
      height: 100%;
  }

  .loader-background .loader-container {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
  }
  .printFrame {
      width: 100%;
      height: 100vh;
  }
</style>
