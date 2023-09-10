<template>
    <div class="administration-permissions-page mb-10">

        <div class="mb-10 mt-5">
            <h3 class="text-lg mb-3 --text-heading font-semibold">Permissions</h3>
            <breadcrumbs
            :lists="[
                { text: 'Administration' },
                { text: 'Permissions' }
            ]"
            />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <entry-search />
            <entry-form />
        </div>

        <entry-lists class="mt-5" />

    </div>
</template>
<script>
import EntrySearch from "@page_components/administration-permission/Search.vue";
import EntryForm from "@page_components/administration-permission/Form.vue";
import EntryLists from "@page_components/administration-permission/Lists.vue";
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import { mapMutations, mapActions } from "vuex";

export default {
    name: "AdministrationPermissionsPage",
    layout: "main",
    middleware: ['auth', 'non-employee', 'non-organization'],
    ssr: false,
    components: {
        Breadcrumbs,
        EntryLists,
        EntryForm,
        EntrySearch
    },
    head() {
        return {
            title: 'Permissions' + this.theAppTitle
        }
    },
    methods: {
        ...mapMutations('administration/permissions', [
            'setState'
        ]),
        ...mapActions('administration/permissions', [
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
                this.findPageComponent('AdministrationPermissionForm').$refs.entryform.open=false;
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