<template>
    <div class="main-order-page">
        
        <!-- <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Order</h3>
            <breadcrumbs
            :lists="[
                { text: 'Order' }
            ]"
            />
        </div> -->

        <!-- <page-filter /> -->
        <!-- <page-search /> -->

        <page-lists />
    </div>
</template>
<script>
//import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
//import PageFilter from "@page_components/main-order/Filter.vue";
import PageLists from "@page_components/main-order/PrintList.vue";
//import PageForm from "@page_components/main-order/Form.vue";
//import PageSearch from "@page_components/main-order/Search.vue";
import { mapActions } from "vuex";

export default {
    name: "MainOrderPage",
    // layout: "main",
    middleware: ['auth'],
    ssr: false,
    components: {
        //PageFilter,
        PageLists,
        //Breadcrumbs,
        //PageSearch,
        //PageForm
    },
    head() {
        return {
            title: 'Order' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('order/order', [
            'fetchEntry',
            'fetchByUID'
        ])
    },
    watch: {
        $route: async function(to, from) {
            if(to.query.uid) {
                this.nuxtload();
                await this.fetchByUID(to.query.uid);
                this.nuxtunload();
            } else {
                this.findPageComponent('MainOrderForm').$refs.adjustmentmodal.open=false;
            }
        }
    },
    async mounted() {
        await this.fetchEntry();

        if(this.$route.query.uid) {
            this.nuxtload();
            await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    }
}
</script>