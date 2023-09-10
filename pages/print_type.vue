<template>
    <div class="main-print_type-page mb-10">
        
        <div class="mb-10 mt-5">
            <breadcrumbs
            :lists="[
                { text: 'PrintType' }
            ]"
            />
        </div>

        <!-- <page-filter /> -->
        <page-search />

        <page-lists />

        <page-form />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import PageFilter from "@page_components/main-print-type/Filter.vue";
import PageLists from "@page_components/main-print-type/Lists.vue";
import PageForm from "@page_components/main-print-type/Form.vue";
import PageSearch from "@page_components/main-print-type/Search.vue";

import { mapActions } from "vuex";

export default {
    name: "MainPrintTypePage",
    layout: "main",
    middleware: ['auth'],
    ssr: false,
    components: {
        PageFilter,
        PageLists,
        Breadcrumbs,
        PageForm,
        PageSearch
    },
    head() {
        return {
            title: 'Print Type' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('main/print_type', [
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
                this.findPageComponent('MainPrintTypeForm').$refs.adjustmentmodal.open=false;
            }
        }
    },
    async created() {
        await this.assignPage('Print Types')
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