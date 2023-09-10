<template>
    <div class="employees-leave-requests-page mb-10">
        <page-header />

        <div class="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 gap-4">
            <div>
                <page-search />
            </div>
            <div></div>
            <div></div>
            <div>
                <page-form />
            </div>
        </div>
        
        <edit-form />
        <page-lists class="mt-5" />

    </div>
</template>
<script>
import PageHeader from "@page_components/main-eod/PageHeader.vue";
import PageLists from "@page_components/main-eod/Lists.vue";
import PageSearch from "@page_components/main-eod/Search.vue";
import PageForm from "@page_components/main-eod/Form.vue";
import EditForm from "@page_components/main-eod/Edit.vue";

import { mapMutations, mapActions } from "vuex";

export default {
    name: "EmployeesEodPage",
    layout: "main",
    middleware: ['auth', 'employee','organizationUID'],
    ssr: false,

    head() {
        return {
            title: 'Eod' + this.theAppTitle
        }
    },
    components: {
        PageHeader,
        PageLists,
        PageSearch,
        PageForm,
        EditForm
    },
    methods: {
        ...mapMutations('main/eod', [
            'setState'
        ]),
        ...mapActions('main/eod', [
            'fetchEntry',
            'fetchByUID'
        ]),
    
    },
    watch: {
        $route: async function(to, from) {
            if(to.query.uid) {
                this.nuxtload();
                await this.fetchByUID(to.query.uid)
                this.nuxtunload();
            } else {
                this.findPageComponent('EmployeesEodEdit').$refs.modal_editentry.open=false;
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