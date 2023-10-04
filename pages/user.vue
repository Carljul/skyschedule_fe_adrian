<template>
    <div class="main-user-page mb-10">
        
        <div class="mb-10 mt-5">
            <breadcrumbs
            :lists="[
                { text: 'User' }
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
import PageFilter from "@page_components/main-user/Filter.vue";
import PageSearch from "@page_components/main-user/Search.vue";
import PageLists from "@page_components/main-user/Lists.vue";
import PageForm from "@page_components/main-user/Form.vue";
import EditForm from "@page_components/main-user/Edit.vue";
import { mapActions } from "vuex";

export default {
    name: "MainUserPage",
    layout: "main",
    middleware: ['auth'],
    ssr: false,
    components: {
        PageFilter,
        PageLists,
        Breadcrumbs,
        PageSearch,
        PageForm,
        EditForm,
    },
    head() {
        return {
            title: 'User' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('main/user', [
            'fetchEntry',
            'fetchByID'
        ]),
        ...mapActions('global', [
            'assignPage',
        ]),
    },
    watch: {
        $route: async function(to, from) {
            if(to.query.id) {
                this.nuxtload();
                await this.fetchByID(to.query.id);
                this.nuxtunload();
            } else {
                this.findPageComponent('UsersIndexEdit').$refs.modal_editentry.open=false;
            }
        }
    },
    async created() {
        await this.assignPage('Users')
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