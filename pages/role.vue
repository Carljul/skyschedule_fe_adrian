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

        <page-lists />

        <page-form />

    </div>
</template>
<script>
import Breadcrumbs from "@components/reusables/Breadcrumbs.vue";
import PageFilter from "@page_components/main-role/Filter.vue";
import PageSearch from "@page_components/main-role/Search.vue";
import PageLists from "@page_components/main-role/Lists.vue";
import PageForm from "@page_components/main-role/Form.vue";

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
        PageForm
    },
    head() {
        return {
            title: 'Role' + this.theAppTitle
        }
    },
    methods: {
        ...mapActions('main/role', [
            'fetchEntry',
            'fetchByUID'
        ]),
        ...mapActions('global', [
            'assignPage',
        ]),
    },
    async created() {
        await this.assignPage('Roles')
    },
    watch: {
        $route: async function(to, from) {
            if(to.query.uid) {
                this.nuxtload();
                await this.fetchByUID(to.query.uid);
                this.nuxtunload();
            } else {
                this.findPageComponent('MainRoleForm').$refs.adjustmentmodal.open=false;
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