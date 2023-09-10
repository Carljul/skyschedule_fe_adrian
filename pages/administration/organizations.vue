<template>
    <div class="administration-organizations-page mb-10">
        <page-header />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <search-form />
            <user-form />
        </div>
        
        <entry-lists class="mt-5" />
        <edit-form/>
        
    </div>
</template>
<script>
import PageHeader from "@page_components/administration-organizations/PageHeader.vue";
import EntryLists from "@page_components/administration-organizations/Lists.vue";
import SearchForm from "@page_components/administration-organizations/Search.vue";
import UserForm from "@page_components/administration-organizations/Form.vue";
import EditForm from "@page_components/administration-organizations/Edit.vue";

import { mapMutations, mapActions } from "vuex";

export default {
    name: "AdministrationOrganizationsPage",
    layout: "main",
    middleware: ['auth', 'non-employee', 'non-organization'],
    ssr: false,
    head() {
        return {
            title: 'Organizations' + this.theAppTitle
        }
    },
    components: {
        PageHeader,
        EntryLists,
        SearchForm,
        UserForm,
        EditForm
    },
    methods: {
        ...mapMutations('administration/organizations', [
            'setState'
        ]),
        ...mapActions('administration/organizations', [
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
                this.findPageComponent('AdminOrganizationsEdit').$refs.modal_editentry.open=false;
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