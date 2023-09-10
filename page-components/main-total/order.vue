<template>
    <div class="main-tool-page mb-10">
        
        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Totals Date and Week</h3>
            <breadcrumbs
            :lists="[
                { text: 'Totals' }
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
import PageFilter from "@page_components/main-tool/Filter.vue";
import PageLists from "@page_components/main-tool/Lists.vue";
import PageForm from "@page_components/main-tool/Form.vue";

import { mapActions } from "vuex";

export default {
    name: "MainTotalsPage",
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
            title: 'Totals' + this.theAppTitle
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
                this.findPageComponent('MainTotalsForm').$refs.adjustmentmodal.open=false;
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