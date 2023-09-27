<template>
    <div class="main-order-page mb-10">
        
        <div class="mb-10 mt-5">
            <breadcrumbs
            :lists="[
                { text: 'Order' }
            ]"
            />
        </div>

        <!-- <page-filter /> -->

        <page-lists />

        <page-form />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import PageFilter from "@page_components/order-by-date/Filter.vue";
import PageLists from "@page_components/order-by-date/Lists.vue";
import PageForm from "@page_components/order-by-date/Form.vue";

import { mapActions } from "vuex";

export default {
    name: "MainOrderPage",
    layout: "main",
    middleware: ['auth'],
    ssr: false,
    components: {
        PageFilter,
        PageLists,
        Breadcrumbs,
        PageForm
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
        ]),
        ...mapActions('global', [
            'assignPage',
        ]),
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
    async created() {
        await this.assignPage('Orders by Date')
    },
    async mounted() {
        this.fetchEntry();

        if(this.$route.query.id) {
            this.nuxtload();
            await this.fetchByUID(this.$route.query.id);
            this.nuxtunload();
        }
    }
}
</script>