<template>
    <div class="administration-users-page mb-10">
        <page-header />

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <search-form />
            <user-form />
        </div>
        
        <users-table class="mt-5" />
        <edit-form/>
        
    </div>
</template>
<script>
import PageHeader from "@page_components/administration-users/PageHeader.vue";
import UsersTable from "@page_components/administration-users/Lists.vue";
import SearchForm from "@page_components/administration-users/Search.vue";
import UserForm from "@page_components/administration-users/Form.vue";
import EditForm from "@page_components/administration-users/Edit.vue";

import { mapMutations, mapActions } from "vuex";

export default {
    name: "AdministrationUsersPage",
    layout: "main",
    middleware: ['auth', 'non-employee', 'non-organization'],
    ssr: false,
    head() {
        return {
            title: 'Users' + this.theAppTitle
        }
    },
    components: {
        PageHeader,
        UsersTable,
        SearchForm,
        UserForm,
        EditForm
    },
    methods: {
        ...mapMutations('administration/users', [
            'setState'
        ]),
        ...mapActions('administration/users', [
            'fetchUsers',
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
                this.findPageComponent('AdminUsersEdit').$refs.modal_editentry.open=false;
            }
        }
    },
    async mounted() {
        await this.fetchUsers();

        if(this.$route.query.uid) {
            this.nuxtload();
            await this.fetchByUID(this.$route.query.uid);
            this.nuxtunload();
        }
    }
}
</script>