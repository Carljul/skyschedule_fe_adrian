<template>
    <div class="main-role-page mb-10">
        
        <div class="mb-10 mt-5">
            <breadcrumbs
            :lists="[
                { text: 'Role' }
            ]"
            />
        </div>

        <page-search />
        <page-form />
        <edit-form />
        <page-lists />

        

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import PageFilter from "@page_components/main-role/Filter.vue";
import PageSearch from "@page_components/main-role/Search.vue";
import PageLists from "@page_components/main-role/Lists.vue";
import PageForm from "@page_components/main-role/Form.vue";
import EditForm from "@page_components/main-role/Edit.vue";
import { mapActions } from "vuex";

export default {
    name: "MainRolePage",
    layout: "main",
    middleware: ['auth'],
    ssr: false,
    components: {
        PageFilter,
        PageLists,
        Breadcrumbs,
        PageSearch,
        PageForm,
        EditForm
    },
    head() {
        return {
            title: 'Role' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('main/role', [
            'fetchEntry',
            'fetchByID'
        ]),
    },
    watch: {
        $route: async function(to, from) {
            if(to.query.id) {
                this.nuxtload();
                await this.fetchByID(to.query.id)
                this.nuxtunload();
            } else {                
                this.findPageComponent('RoleIndexEdit').$refs.modal_editentry.open=false;

            }
        }
    },
    async mounted() {
        
        this.fetchEntry();

        if(this.$route.query.id) {
            this.nuxtload();
            await this.fetchByID(this.$route.query.id);
            this.nuxtunload();
        }
    }
}
</script>