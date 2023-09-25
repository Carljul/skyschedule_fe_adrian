<template>
    <div class="index-time-sheet-lists">
        <div v-if="state.entry.loading" class="loader-background">
            <div class="loader-container">
                <loader class="m-auto" style="display:block;" />
                <p>Preparing Data</p>
            </div>
        </div>
        <iframe :src="print" class="printFrame"></iframe>
    </div>
</template>
<script>
import Loader from "@components/reusables/Loader.vue";

import { mapState, mapMutations, mapActions } from "vuex"

export default {
    name: 'MainOrderLists',
    components: {
        Loader,
    },
    computed: {
        ...mapState({
            state: state => state.order.order.state,
            print: state => state.order.order.print,
        }),
    },
    methods: {
        ...mapMutations('order/order', [
            'setState',
            'setToPrint'
        ]),
        ...mapActions('order/order', [
            'fetchToPrint'
        ]),
    },
    async created() {
        await this.fetchToPrint();
    }
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
