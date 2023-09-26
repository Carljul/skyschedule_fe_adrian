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
    name: 'MainOrderLists',
    data() {
        return {
            printLink: ''
        };
    },
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
        alert(message) {
            alert(message);
        }
    },
    watch: {
        print: function(newdata, olddata) {
            console.log(['newdata', newdata])
            this.printLink = newdata;
        }
    },
    async created() {
        await this.fetchToPrint();
        this.printLink = this.print
        if (this.print == null) {
            this.alert('File is too large');
            window.close();
        }
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
