<template>
    <div class="main-order-page mb-10">
        
        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Overtime</h3>
            <breadcrumbs
            :lists="[
                { text: 'Overtime' }
            ]"
            />
        </div>

        <page-filter />

        <page-lists />

        <page-form />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import PageFilter from "@page_components/main-order/Filter.vue";
import PageLists from "@page_components/main-order/Lists.vue";
import PageForm from "@page_components/main-order/Form.vue";

import { mapActions } from "vuex";

export default {
    name: "MainOvertimePage",
    layout: "main",
    middleware: ['auth', 'employee'],
    ssr: false,
    components: {
        PageFilter,
        PageLists,
        Breadcrumbs,
        PageForm
    },
    head() {
        return {
            title: 'Overtime' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('main/order', [
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
        
        this.fetchEntry();

        if(this.$route.query.uid) {
            this.nuxtload();
            await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    }
}
</script>